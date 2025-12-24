import React, { useState, useRef, useEffect } from "react";
import "./editor.css";
import Client from "../client";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { autocompletion } from "@codemirror/autocomplete";
import { cpp } from "@codemirror/lang-cpp";
import { javascript } from "@codemirror/lang-javascript";
import { python as pythonLang } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { EditorView } from "@codemirror/view";
import { initSocket } from "../socket";
import { useLocation, useNavigate } from "react-router-dom";

// Helper to read query params
const useQuery = () => new URLSearchParams(window.location.search);

const Editorpage = () => {
  const socketRef = useRef(null);
  const isRemoteChange = useRef(false);

  const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery();

  // Room details
  const roomId = location.state?.roomId || query.get("roomId");
  const username = location.state?.username || query.get("username");

  const [clients, setClients] = useState([]);
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [socketError, setSocketError] = useState(null);

  const isMissingState = !roomId || !username;

  const languageExtensions = {
    cpp: cpp(),
    c: cpp(),
    python: pythonLang(),
    java: java(),
    javascript: javascript(),
  };

  const fontSizeTheme = EditorView.theme({
    "&": { fontSize: "25px" },
  });

  /* ---------------- SOCKET CONNECTION ---------------- */
  useEffect(() => {
    if (!roomId || !username) return;
    if (socketRef.current) return;

    const socket = initSocket();
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("join", { roomId, username });
    });

    socket.on("joined", ({ clients }) => {
      setClients(clients);
    });

    socket.on("CODE_CHANGE", ({ code }) => {
      isRemoteChange.current = true;
      setCode(code);
      isRemoteChange.current = false;
    });

    socket.on("connect_error", () => {
      setSocketError("Could not connect to server");
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [roomId, username]);

  /* ---------------- ERROR SCREENS ---------------- */
  if (socketError) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "red" }}>
        <h2>Socket Connection Error</h2>
        <p>{socketError}</p>
        <p>
          Make sure backend is running on <b>http://localhost:5000</b>
        </p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (isMissingState) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>Error: Room ID or Username missing</h2>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="mainlabelWrap">
      {/* SIDEBAR */}
      <div className="aside">
        <div className="logo">
          <img src="/templatereal.png" alt="logo" className="editorLogo" />
        </div>

        <h3 className="userHeading">Connected Users</h3>

        <div className="clientList">
          {clients.map((client) => (
            <Client key={client.socketId} username={client.username} />
          ))}
        </div>

        <div className="btnGroup">
          <button
            className="btn Copybtn"
            onClick={() => navigator.clipboard.writeText(roomId)}
          >
            Copy Room ID
          </button>

          <button className="btn leave" onClick={() => navigate("/")}>
            Leave Room
          </button>
        </div>
      </div>

      {/* EDITOR */}
      <div className="editorPage">
        <div className="editorHeader">
          <h2>CodeSync Editor</h2>

          <select
            className="languageSelect"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>

        <div className="editorMain">
          <CodeMirror
            value={code}
            height="50vh"
            theme={oneDark}
            extensions={[
              languageExtensions[language],
              autocompletion({ activateOnTyping: true }),
              fontSizeTheme,
            ]}
            onChange={(value) => {
              setCode(value);
              if (!isRemoteChange.current && socketRef.current) {
                socketRef.current.emit("CODE_CHANGE", {
                  roomId,
                  code: value,
                });
              }
            }}
          />

          <div className="outputBox">
            <div className="outputTitle">Output</div>
            <pre className="outputText">{output}</pre>
          </div>
        </div>

        <button
          className="runButton"
          onClick={async () => {
            const res = await fetch("http://localhost:5000/run", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ language, code }),
            });

            const data = await res.json();
            setOutput(data.output);
          }}
        >
          Run Code
        </button>
      </div>
    </div>
  );
};

export default Editorpage;
