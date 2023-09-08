import { NextApiResponse } from "next";
import { Socket, Server as NetServer } from "net";
import { Server as SocketIOServer } from "socket.io";

export type NextApiResponseWithSocket = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export interface JoinRoomData {
  roomId: string;
  username: string;
}

export interface User {
  id: string;
  username: string;
  roomId: string;
}

export interface RoomJoinedData {
  user: User;
  roomId: string;
  members: User[];
}

export interface Notification {
  title: string;
  message: string;
}
