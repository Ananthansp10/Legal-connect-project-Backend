import mongoose, { Schema } from "mongoose";
import { WalletEntity } from "../../domain/entity/walletEntity";

const walletSchema=new mongoose.Schema<WalletEntity>({
    recieverId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    transactionHistory:[{
        transactionType:{
            type:String,
            required:true
        },
        senderId:{
            type:Schema.Types.ObjectId,
        },
        senderName:{
            type:String,
        },
        amount:{
            type:Number,
            required:true
        },
        purpose:{
            type:String,
            required:true
        }
    }]
})

export const walletModel=mongoose.model<WalletEntity>('wallet',walletSchema)