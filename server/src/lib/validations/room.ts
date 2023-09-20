import { Socket } from "socket.io";
import { JoinRoomData } from "../../types";
import z from "zod";

export const joinRoomSchema = z.object({
  username: z.string().nonempty(),
  roomId: z.string().length(10, "Room ID must contain exactly 10 characters"),
});

export function validateJoinRoomData(
  socket: Socket,
  joinRoomData: JoinRoomData
) {
  try {
    return joinRoomSchema.parse(joinRoomData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      socket.emit("invalid-data", {
        message:
          "The entities you provided are not correct and cannot be processed.",
      });
    }
  }
}
