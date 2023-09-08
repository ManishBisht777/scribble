import { Socket } from "socket.io";
import { addUser, getRoomMembers } from "./users";

export function joinRoom(socket: Socket, roomId: string, username: string) {
  socket.join(roomId);
  const user = {
    id: socket.id,
    username,
  };
  addUser({ ...user, roomId });
  const members = getRoomMembers(roomId);

  console.log(members);
  socket.emit("room-joined", { user, roomId, members });
  socket.to(roomId).emit("update-members", members);
  socket.to(roomId).emit("send-notification", {
    title: "New member arrived!",
    message: `${username} joined the party.`,
  });
}
