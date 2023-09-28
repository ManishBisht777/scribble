import { z } from "zod";

export const CreateRoomSchema = z.object({
  username: z.string().nonempty(),
  avatarStyle: z.string().nonempty(),
});

export const JoinRoomSchema = z.object({
  username: z.string().nonempty(),
  roomId: z.string().length(10),
  avatarStyle: z.string().nonempty(),
});
