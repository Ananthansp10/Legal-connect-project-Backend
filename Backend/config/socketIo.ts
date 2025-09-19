import { Server as SocketIOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import { ChatRepository } from "../module/user/infrastructure/repository/chatRepository";
import { AddChatUseCase } from "../module/user/application/use-case/addChatUseCase";
import { UpdateChatReadStatusUseCase } from "../module/user/application/use-case/updateChatReadStatusUseCase";
import mongoose from "mongoose";
import { LawyerChatRepository } from "../module/lawyer/infrastructure/repository/lawyerChatRepository";
import { UpdateReadStatusUseCase } from "../module/lawyer/application/use-case/updateReadStatusUseCase";

let io: SocketIOServer;

const chatRepo = new ChatRepository();
const addChatUseCase = new AddChatUseCase(chatRepo);
const updateChatReadStatusUseCase = new UpdateChatReadStatusUseCase(chatRepo);
const lawyerChatRepo = new LawyerChatRepository();
const updateLawyerChatReadStatusUseCase = new UpdateReadStatusUseCase(lawyerChatRepo);

const userSocketMap = new Map<string, string>(); // userId → socketId
const rooms: { [roomId: string]: string[] } = {}; // roomId → [socketId]

export const initSocket = (server: HTTPServer) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Map userId → socket.id
    socket.on("register", (userId: string) => {
      userSocketMap.set(userId, socket.id);
    });

    // Chat messages
    socket.on("send_message", async (data) => {
      const { senderId, receiverId, message } = data;
      const receiverSocketId = userSocketMap.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receive_message", { senderId, receiverId, message });
      }
      await addChatUseCase.execute(senderId, receiverId, message);
    });

    // Update read status
    socket.on("update_read_status", async ({ userId, lawyerId }) => {
      await updateChatReadStatusUseCase.execute(
        new mongoose.Types.ObjectId(String(userId)),
        new mongoose.Types.ObjectId(String(lawyerId))
      );
    });

    socket.on("update_lawyer_chat_status", async ({ lawyerId, userId }) => {
      await updateLawyerChatReadStatusUseCase.execute(
        new mongoose.Types.ObjectId(String(lawyerId)),
        new mongoose.Types.ObjectId(String(userId))
      );
    });

    // WebRTC signaling
    socket.on("join-room", (roomId: string, role: string) => {
      console.log(`${role} has joined room ${roomId}`);
      socket.join(roomId);

      if (!rooms[roomId]) rooms[roomId] = [];
      rooms[roomId].push(socket.id);

      // Send existing peers to new peer
      const otherPeers = rooms[roomId].filter((id) => id !== socket.id);
      socket.emit("all-peers", otherPeers);

      // Notify other peers that a new peer has joined
      socket.to(roomId).emit("peer-joined", { socketId: socket.id, role });
    });

    // Forward offer
    socket.on("offer", ({ offer, to }: { offer: RTCSessionDescriptionInit; to: string }) => {
      io.to(to).emit("offer", { offer, from: socket.id });
    });

    // Forward answer
    socket.on("answer", ({ answer, to }: { answer: RTCSessionDescriptionInit; to: string }) => {
      io.to(to).emit("answer", { answer, from: socket.id });
    });

    // Forward ICE candidate
    socket.on("ice-candidate", ({ candidate, to }: { candidate: RTCIceCandidateInit; to: string }) => {
      io.to(to).emit("ice-candidate", { candidate, from: socket.id });
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      // Remove from userSocketMap
      for (let [userId, sockId] of userSocketMap.entries()) {
        if (sockId === socket.id) {
          userSocketMap.delete(userId);
          break;
        }
      }

      // Remove from rooms
      for (const roomId in rooms) {
        rooms[roomId] = rooms[roomId].filter((id) => id !== socket.id);
        socket.to(roomId).emit("peer-left", socket.id);
        if (rooms[roomId].length === 0) delete rooms[roomId];
      }
    });
  });

  return io;
};

export const getSocket = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};
