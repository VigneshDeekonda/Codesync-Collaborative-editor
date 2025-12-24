const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("CONNECTED:", socket.id);

  // JOIN ROOM
  socket.on("join", ({ roomId, username }) => {
    console.log("JOIN RECEIVED:", roomId, username);

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
