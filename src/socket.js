import { io } from "socket.io-client";

export const BACKEND_URL =
  process.env.REACT_APP_BASE_URL ||
  (typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:5000"
    : "https://codesync-collaborative-editor-production.up.railway.app");

export const initSocket = () => {
  return io(BACKEND_URL, {
    transports: ["polling", "websocket"],
  });
};