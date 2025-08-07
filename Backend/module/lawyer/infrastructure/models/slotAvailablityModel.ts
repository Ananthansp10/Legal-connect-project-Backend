import mongoose, { Schema, Types } from "mongoose";
import { ISlotAvailablityEntity } from "../../domain/entity/slotAvailablityEntity";


const slotAvailablityShema=new Schema<ISlotAvailablityEntity>({
    lawyerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'lawyers',
        required:true
    },
    availablity:[
        {
            date:String,
            timeSlots:[
                {
                    startTime:String,
                    endTime:String,
                    isBooked:Boolean
                }
            ]
        }
    ]
})

export const availableSlotModel=mongoose.model<ISlotAvailablityEntity>('availableSlots',slotAvailablityShema)