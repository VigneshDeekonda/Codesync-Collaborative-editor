import { io } from "socket.io-client";

export const initSocket = () => {
  return io("https://codesync-collaborative-editor-production.up.railway.app");
};