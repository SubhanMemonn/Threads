import { Server } from "socket.io";
import http from "http"
import express from "express"
import { Message } from "../models/message.model.js";
import { Conversation } from "../models/conversation.model.js";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "",
        methods: ["GET", "POST"]
    }
});
export const getRecipientSocketId = (recipientId) => {
    return userSocketMap[recipientId]
}
let userSocketMap = {}

io.on("connection", (socket) => {
    const { userId } = socket.handshake.query
    if (userId != "undefined") userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
    socket.on("markMessagesAsSeen", async ({ conversationId, userId }) => {
        try {
            await Message.updateMany({ conversationId: conversationId, seen: false }, { $set: { seen: true } });
            await Conversation.updateOne({ _id: conversationId }, { $set: { "lastMessage.seen": true } })
            io.to(userSocketMap[userId]).emit("messagesSeen", { conversationId })
        } catch (error) {
            console.log(error);
        }
    })
    socket.on("disconnect", () => {
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))

    })
})

export { server, io, app }