import { io } from "socket.io-client";

const SERVER =
  process.env.NODE_ENV === "production"
    ? "https://scribble-production-f06d.up.railway.app/"
    : "https://scribble-production-f06d.up.railway.app/";

export const socket = io(SERVER, { transports: ["websocket"] });
