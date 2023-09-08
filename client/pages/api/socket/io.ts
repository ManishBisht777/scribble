import { NextApiResponse } from "next";
import { Socket, Server as SocketIOServer } from "socket.io";
import { Server as NetServer } from "http";

import { JoinRoomData, NextApiResponseWithSocket } from "@/types/types";
import { validateJoinRoomData } from "@/lib/validations/room";
import { addUser, getRoomMembers } from "@/lib/users";

export const config = {
  api: {
    bodyParser: false,
  },
};

function joinRoom(socket: Socket, roomId: string, username: string) {
  socket.join(roomId);
  const user = {
    id: socket.id,
    username,
  };
  addUser({ ...user, roomId });
  const members = getRoomMembers(roomId);

  socket.emit("room-joined", { user, roomId, members });
  socket.to(roomId).emit("update-members", members);
  socket.to(roomId).emit("send-notification", {
    title: "New member arrived!",
    message: `${username} joined the party.`,
  });
}

const ioHandler = (req: NextApiResponse, res: NextApiResponseWithSocket) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new SocketIOServer(httpServer, {
      path: path,
      //@ts-ignore
      addTrailingSlash: false,
    });

    io.on("connection", (socket) => {
      socket.on("create-room", (joinRoomData: JoinRoomData) => {
        const validatedData = validateJoinRoomData(socket, joinRoomData);

        if (!validatedData) return;
        const { roomId, username } = validatedData;

        joinRoom(socket, roomId, username);
      });
    });
  }
};

export default ioHandler;
