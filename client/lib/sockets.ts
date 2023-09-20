import { io } from "socket.io-client";

const SERVER =
  process.env.NODE_ENV === "production"
    ? "https://draw-with-me-socket-server.herokuapp.com/"
    : "https://scribble-production-d67b.up.railway.app:3001";

export const socket = io(SERVER, { transports: ["websocket"] });
