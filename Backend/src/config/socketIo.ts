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
const updateLawyerChatReadStatusUseCase = new UpdateReadStatusUseCase(
  lawyerChatRepo,
);

const userSocketMap = new Map<string, string>();

export const initSocket = (server: HTTPServer) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-room", (role, roomId) => {
      socket.join(roomId);
      const clients = io.sockets.adapter.rooms.get(roomId);
      if (clients && clients.size >= 2) {
        socket.to(roomId).emit("peer-joined");
      }
    });

    socket.on("offer", (offer, roomId) => {
      socket.to(roomId).emit("offer", offer);
    });

    socket.on("answer", (answer, roomId) => {
      socket.to(roomId).emit("answer", answer);
    });

    socket.on("candidate", (candidate, roomId) => {
      socket.to(roomId).emit("candidate", candidate);
    });

    socket.on("send_video_call_message", (message, roomId, role) => {
      socket.to(roomId).emit("recieve_video_call_message", message, role);
    });

    socket.on("register", (userId: string) => {
      userSocketMap.set(userId, socket.id);
    });

    socket.on("send_message", async (data) => {
      const { senderId, receiverId, message } = data;
      const receiverSocketId = userSocketMap.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receive_message", {
          senderId,
          receiverId,
          message,
        });
      }
      await addChatUseCase.execute(senderId, receiverId, message);
    });

    socket.on("update_read_status", async ({ userId, lawyerId }) => {
      await updateChatReadStatusUseCase.execute(
        new mongoose.Types.ObjectId(String(userId)),
        new mongoose.Types.ObjectId(String(lawyerId)),
      );
    });

    socket.on("update_lawyer_chat_status", async ({ lawyerId, userId }) => {
      await updateLawyerChatReadStatusUseCase.execute(
        new mongoose.Types.ObjectId(String(lawyerId)),
        new mongoose.Types.ObjectId(String(userId)),
      );
    });

    socket.on("signal", ({ roomId, data }) => {
      console.log("yees");
      socket.to(roomId).emit("signal", { id: socket.id, data });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

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
