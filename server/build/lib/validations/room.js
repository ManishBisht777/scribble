"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJoinRoomData = exports.joinRoomSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.joinRoomSchema = zod_1.default.object({
    username: zod_1.default.string().nonempty(),
    roomId: zod_1.default.string().length(10, "Room ID must contain exactly 10 characters"),
});
function validateJoinRoomData(socket, joinRoomData) {
    try {
        return exports.joinRoomSchema.parse(joinRoomData);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            socket.emit("invalid-data", {
                message: "The entities you provided are not correct and cannot be processed.",
            });
        }
    }
}
exports.validateJoinRoomData = validateJoinRoomData;
