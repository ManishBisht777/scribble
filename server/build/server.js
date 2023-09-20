"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const room_1 = require("./lib/validations/room");
const room_2 = require("./lib/room");
const users_1 = require("./lib/users");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
function isRoomCreated(roomId) {
    const rooms = [...io.sockets.adapter.rooms];
    return rooms === null || rooms === void 0 ? void 0 : rooms.some((room) => room[0] === roomId);
}
io.on("connection", (socket) => {
    socket.on("create-room", (joinRoomData) => {
        const validatedData = (0, room_1.validateJoinRoomData)(socket, joinRoomData);
        if (!validatedData)
            return;
        const { roomId, username } = validatedData;
        (0, room_2.joinRoom)(socket, roomId, username);
    });
    socket.on("join-room", (joinRoomData) => {
        const validatedData = (0, room_1.validateJoinRoomData)(socket, joinRoomData);
        if (!validatedData)
            return;
        const { roomId, username } = validatedData;
        if (isRoomCreated(roomId)) {
            return (0, room_2.joinRoom)(socket, roomId, username);
        }
        socket.emit("room-not-found", {
            message: "Oops! The Room ID you entered doesn't exist or hasn't been created yet.",
        });
    });
    socket.on("client-ready", (roomId) => {
        const members = (0, users_1.getRoomMembers)(roomId);
        // Don't need to request the room's canvas state if a user is the first member
        if (members.length === 1)
            return socket.emit("client-loaded");
        const adminMember = members[0];
        if (!adminMember)
            return;
        socket.to(adminMember.id).emit("get-canvas-state");
    });
    socket.on("send-canvas-state", ({ canvasState, roomId }) => {
        const members = (0, users_1.getRoomMembers)(roomId);
        const lastMember = members[members.length - 1];
        if (!lastMember)
            return;
        socket.to(lastMember.id).emit("canvas-state-from-server", canvasState);
    });
    socket.on("clear-canvas", (roomId) => {
        socket.to(roomId).emit("clear-canvas");
    });
    socket.on("draw", ({ drawOptions, roomId }) => {
        socket.to(roomId).emit("update-canvas-state", drawOptions);
    });
    socket.on("send-message", (data) => {
        socket.to(data.roomId).emit("new-message", data.message);
    });
    socket.on("leave-room", () => {
        (0, room_2.leaveRoom)(socket);
    });
    socket.on("disconnect", () => {
        (0, room_2.leaveRoom)(socket);
    });
});
server.listen(3001, "0.0.0.0", () => {
    console.log("Server is running on port 3001");
});
