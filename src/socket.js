import { io } from "socket.io-client";

export const initSocket = () => {
  const SOCKET_URL =
    process.env.NODE_ENV === "production"
      ? "https://codesync-collaborative-editor.onrender.com"
      : "http://localhost:5000";

  return io(SOCKET_URL);
};