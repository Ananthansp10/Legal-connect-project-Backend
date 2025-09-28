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

const userSocketMap = new Map<string, string>();
const roomMap = new Map<string, { lawyer?: string; user?: string }>();

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

     socket.on("join-room", (roomId: string, role: "lawyer" | "user") => {
    socket.join(roomId);
    if (!roomMap.has(roomId)) roomMap.set(roomId, {});
    const room = roomMap.get(roomId)!;
    room[role] = socket.id;

    console.log(`${role} joined room ${roomId}`);

    // If both are present, notify
    if (room.lawyer && room.user) {
      io.to(room.lawyer).emit("ready");
      io.to(room.user).emit("ready");
    }
  });

  // Lawyer sends offer
  socket.on("offer", ({ roomId, offer }) => {
    const room = roomMap.get(roomId);
    if (room?.user) {
      io.to(room.user).emit("callUser", { from: socket.id, signal: offer });
    }
  });

  // User sends answer
  socket.on("answerCall", ({ roomId, answer }) => {
    const room = roomMap.get(roomId);
    if (room?.lawyer) {
      io.to(room.lawyer).emit("receive-answer", answer);
    }
  });

  // ICE candidates
  socket.on("ice-candidate", ({ roomId, candidate, to }) => {
    if (to) {
      io.to(to).emit("ice-candidate", candidate);
    }
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
    });
  });

  return io;
};

export const getSocket = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};
