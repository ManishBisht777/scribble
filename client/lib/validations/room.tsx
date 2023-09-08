import { JoinRoomData } from "@/types/types";
import { Socket } from "socket.io";
import { z } from "zod";

export const CreateRoomSchema = z.object({
  username: z.string().nonempty(),
});

export const JoinRoomSchema = z.object({
  username: z.string().max(10),
  roomId: z.string().length(10),
});

export function validateJoinRoomData(
  socket: Socket,
  joinRoomData: JoinRoomData
) {
  try {
    return JoinRoomSchema.parse(joinRoomData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      socket.emit("invalid-data", {
        message:
          "The entities you provided are not correct and cannot be processed.",
      });
    }
  }
}
