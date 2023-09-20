"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveRoom = exports.joinRoom = void 0;
const users_1 = require("./users");
function joinRoom(socket, roomId, username) {
    socket.join(roomId);
    const user = {
        id: socket.id,
        username,
    };
    (0, users_1.addUser)(Object.assign(Object.assign({}, user), { roomId }));
    const members = (0, users_1.getRoomMembers)(roomId);
    socket.emit("room-joined", { user, roomId, members });
    socket.to(roomId).emit("update-members", members);
    socket.to(roomId).emit("send-notification", {
        title: "New member arrived!",
        message: `${username} joined the party.`,
    });
}
exports.joinRoom = joinRoom;
function leaveRoom(socket) {
    const user = (0, users_1.getUser)(socket.id);
    if (!user)
        return;
    const { username, roomId } = user;
    (0, users_1.removeUser)(socket.id);
    const members = (0, users_1.getRoomMembers)(roomId);
    socket.to(roomId).emit("update-members", members);
    socket.to(roomId).emit("send-notification", {
        title: "Member departure!",
        message: `${username} left the party.`,
    });
    socket.leave(roomId);
}
exports.leaveRoom = leaveRoom;
