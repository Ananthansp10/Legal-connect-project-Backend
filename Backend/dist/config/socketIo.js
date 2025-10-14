"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocket = exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
const chatRepository_1 = require("../module/user/infrastructure/repository/chatRepository");
const addChatUseCase_1 = require("../module/user/application/use-case/addChatUseCase");
const updateChatReadStatusUseCase_1 = require("../module/user/application/use-case/updateChatReadStatusUseCase");
const mongoose_1 = __importDefault(require("mongoose"));
const lawyerChatRepository_1 = require("../module/lawyer/infrastructure/repository/lawyerChatRepository");
const updateReadStatusUseCase_1 = require("../module/lawyer/application/use-case/updateReadStatusUseCase");
let io;
const chatRepo = new chatRepository_1.ChatRepository();
const addChatUseCase = new addChatUseCase_1.AddChatUseCase(chatRepo);
const updateChatReadStatusUseCase =
  new updateChatReadStatusUseCase_1.UpdateChatReadStatusUseCase(chatRepo);
const lawyerChatRepo = new lawyerChatRepository_1.LawyerChatRepository();
const updateLawyerChatReadStatusUseCase =
  new updateReadStatusUseCase_1.UpdateReadStatusUseCase(lawyerChatRepo);
const userSocketMap = new Map();
const initSocket = (server) => {
  io = new socket_io_1.Server(server, {
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
    socket.on("register", (userId) => {
      userSocketMap.set(userId, socket.id);
    });
    socket.on("send_message", (data) =>
      __awaiter(void 0, void 0, void 0, function* () {
        const { senderId, receiverId, message } = data;
        const receiverSocketId = userSocketMap.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive_message", {
            senderId,
            receiverId,
            message,
          });
        }
        yield addChatUseCase.execute(senderId, receiverId, message);
      }),
    );
    socket.on("update_read_status", (_a) =>
      __awaiter(void 0, [_a], void 0, function* ({ userId, lawyerId }) {
        yield updateChatReadStatusUseCase.execute(
          new mongoose_1.default.Types.ObjectId(String(userId)),
          new mongoose_1.default.Types.ObjectId(String(lawyerId)),
        );
      }),
    );
    socket.on("update_lawyer_chat_status", (_a) =>
      __awaiter(void 0, [_a], void 0, function* ({ lawyerId, userId }) {
        yield updateLawyerChatReadStatusUseCase.execute(
          new mongoose_1.default.Types.ObjectId(String(lawyerId)),
          new mongoose_1.default.Types.ObjectId(String(userId)),
        );
      }),
    );
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
exports.initSocket = initSocket;
const getSocket = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};
exports.getSocket = getSocket;
