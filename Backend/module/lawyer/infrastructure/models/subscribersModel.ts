import mongoose, { Schema } from "mongoose";
import { ISubscribersEntity } from "../../domain/entity/subscribersEntity";

const subscribersSchema=new mongoose.Schema<ISubscribersEntity>({
    lawyerId:{
        type:Schema.Types.ObjectId,
        ref:'lawyer',
        required:true
    },
    planId:{
        type:Schema.Types.ObjectId,
        ref:"planModel",
        required:true
    },
    date:{
        type:String,
        required:true
    }
})

export const subscribersModel=mongoose.model<ISubscribersEntity>("subscribers",subscribersSchema)