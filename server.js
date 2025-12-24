const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("CONNECTED:", socket.id);

  // JOIN ROOM
  socket.on("join", ({ roomId, username }) => {
    console.log("JOIN:", roomId, username);

    userSocketMap[socket.id] = username;
    socket.join(roomId);

    const clients = Array.from(
      io.sockets.adapter.rooms.get(roomId) || []
    ).map((socketId) => ({
      socketId,
      username: userSocketMap[socketId],
    }));

    io.to(roomId).emit("joined", { clients });
  });

  // REAL-TIME CODE SYNC
  socket.on("CODE_CHANGE", ({ roomId, code }) => {
    socket.to(roomId).emit("CODE_CHANGE", { code });
  });

  // DISCONNECT
  socket.on("disconnect", () => {
    const username = userSocketMap[socket.id];
    delete userSocketMap[socket.id];

    // update remaining users in all rooms
    socket.rooms.forEach((roomId) => {
      const clients = Array.from(
        io.sockets.adapter.rooms.get(roomId) || []
      ).map((socketId) => ({
        socketId,
        username: userSocketMap[socketId],
      }));

      io.to(roomId).emit("joined", { clients });
      console.log("CLIENTS SENT:", clients);
    });

    console.log("DISCONNECTED:", socket.id, username);
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});

const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const executeCode = (language, code) => {
  return new Promise((resolve, reject) => {
    const id = Date.now();
    let filePath, command;

    // Ensure temp directory exists
    fs.mkdirSync('temp', { recursive: true });

    switch (language) {
      case "c":
        filePath = `temp/${id}.c`;
        command = `gcc ${filePath} -o temp/${id}.exe && temp\\${id}.exe`;
        break;

      case "cpp":
        filePath = `temp/${id}.cpp`;
        command = `g++ ${filePath} -o temp/${id}.exe && temp\\${id}.exe`;
        break;

      case "python":
        filePath = `temp/${id}.py`;
        command = `python ${filePath}`;
        break;

      case "java":
        filePath = `temp/${id}Main.java`;
        command = `javac ${filePath} && java -cp temp ${id}Main`;
        break;

      case "javascript":
        filePath = `temp/${id}.js`;
        command = `node ${filePath}`;
        break;

      default:
        reject("Language not supported");
    }

    fs.writeFileSync(filePath, code);

    exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
      if (error) return reject(stderr || error.message);
      resolve(stdout);
    });
  });
};

app.use(express.json());

app.post("/run", async (req, res) => {
  const { language, code } = req.body;

  try {
    const output = await executeCode(language, code);
    res.json({ output });
  } catch (err) {
    res.json({ output: err });
  }
});
