import { io } from "socket.io-client";

const SERVER =
  process.env.NODE_ENV === "production"
    ? "https://draw-with-me-socket-server.herokuapp.com/"
    : "http://localhost:3001";

export const socket = io(SERVER, { transports: ["websocket"] });
