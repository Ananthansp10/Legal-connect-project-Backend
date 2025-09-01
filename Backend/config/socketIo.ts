import { Server as SocketIOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import { ChatRepository } from "../module/user/infrastructure/repository/chatRepository";
import { AddChatUseCase } from "../module/user/application/use-case/addChatUseCase";

let io:SocketIOServer;

const chatRepo=new ChatRepository()
const addChatUseCase=new AddChatUseCase(chatRepo)

const map=new Map()

export const initSocket = (server:HTTPServer) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("register",(senderId)=>{
      map.set(senderId,socket.id)
    })

    socket.on("send_message",async(data)=>{
      const {senderId,receiverId,message}=data

      let receiverSocketId=map.get(receiverId)
      if(receiverSocketId){
        io.to(receiverSocketId).emit("receive_message",{
          senderId,
          receiverId,
          message
        })
      }
      await addChatUseCase.execute(senderId,receiverId,message)
    })

    socket.on("disconnect", () => {
    for (let [userId, sockId] of map.entries()) {
      if (sockId === socket.id) {
        map.delete(userId)
        break
      }
    }
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};

export const getSocket = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};
