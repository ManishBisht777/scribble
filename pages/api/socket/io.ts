import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";
import { Server as NetServer } from "http";

import { NextApiResponseWithSocket } from "@/types/types";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiResponse, res: NextApiResponseWithSocket) => {
  if (!res.socket.server.io) {
    console.log("no server");

    const path = "/api/socket.io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new SocketIOServer(httpServer, {
      path: path,
      //@ts-ignore
      addTrailingSlash: false,
    });
  }
};

export default ioHandler;
