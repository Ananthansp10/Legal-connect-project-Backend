import mongoose, { Schema } from "mongoose";
import { IChatEntity } from "../../domain/entity/chatEntity";


const chatSchema=new Schema<IChatEntity>({
    participants:[
        {
            type:Schema.Types.ObjectId,
            required:true
        }
    ],
    messages:[
        {
            senderId:{
                type:Schema.Types.ObjectId,
                required:true
            },
            receiverId:{
                type:Schema.Types.ObjectId,
                required:true
            },
            message:{
                type:String,
                required:true
            },
            isRead:{
                type:Boolean,
                required:true,
                default:false
            },
            createdAt:{
                type:Date,
                required:true,
                default:Date.now
            }
        }
    ]
})

export const chatModel=mongoose.model<IChatEntity>("chats",chatSchema)