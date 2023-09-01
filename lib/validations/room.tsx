import { z } from "zod";

export const CreateRoomSchema = z.object({
  username: z.string().max(10),
});

export const JoinRoomSchema = z.object({
  username: z.string().max(10),
  roomId: z.string().length(10),
});
