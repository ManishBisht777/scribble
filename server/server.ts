import { Server, type Socket } from "socket.io";
import http from "http";
import cors from "cors";
import express from "express";
import { DrawOptions, JoinRoomData } from "./types";
import { validateJoinRoomData } from "./lib/validations/room";
import { joinRoom, leaveRoom } from "./lib/room";
import { getRoomMembers } from "./lib/users";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

function isRoomCreated(roomId: string) {
  const rooms = [...io.sockets.adapter.rooms];
  return rooms?.some((room) => room[0] === roomId);
}

io.on("connection", (socket: Socket) => {
  socket.on("create-room", (joinRoomData: JoinRoomData) => {
    const validatedData = validateJoinRoomData(socket, joinRoomData);

    if (!validatedData) return;
    const { roomId, username } = validatedData;

    joinRoom(socket, roomId, username);
  });

  socket.on("join-room", (joinRoomData: JoinRoomData) => {
    const validatedData = validateJoinRoomData(socket, joinRoomData);
    if (!validatedData) return;
    const { roomId, username } = validatedData;

    if (isRoomCreated(roomId)) {
      return joinRoom(socket, roomId, username);
    }

    socket.emit("room-not-found", {
      message:
        "Oops! The Room ID you entered doesn't exist or hasn't been created yet.",
    });
  });

  socket.on("client-ready", (roomId: string) => {
    const members = getRoomMembers(roomId);
    // Don't need to request the room's canvas state if a user is the first member
    if (members.length === 1) return socket.emit("client-loaded");

    const adminMember = members[0];

    if (!adminMember) return;

    socket.to(adminMember.id).emit("get-canvas-state");
  });

  socket.on(
    "send-canvas-state",
    ({ canvasState, roomId }: { canvasState: string; roomId: string }) => {
      const members = getRoomMembers(roomId);
      const lastMember = members[members.length - 1];

      if (!lastMember) return;

      socket.to(lastMember.id).emit("canvas-state-from-server", canvasState);
    }
  );

  socket.on("clear-canvas", (roomId: string) => {
    socket.to(roomId).emit("clear-canvas");
  });

  socket.on(
    "draw",
    ({ drawOptions, roomId }: { drawOptions: DrawOptions; roomId: string }) => {
      socket.to(roomId).emit("update-canvas-state", drawOptions);
    }
  );

  socket.on("leave-room", () => {
    leaveRoom(socket);
  });

  socket.on("disconnect", () => {
    leaveRoom(socket);
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
