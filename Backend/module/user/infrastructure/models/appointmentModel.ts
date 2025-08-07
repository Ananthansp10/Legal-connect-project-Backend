import mongoose, { Schema } from "mongoose";
import { IAppointmentEntity } from "../../domain/entity/appointmentModel";

const appointmentSchema=new Schema<IAppointmentEntity>({
    lawyerId:{
        type:Schema.Types.ObjectId,
        ref:'lawyers',
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    appointmentStatus:{
        type:String,
    }
})

export const appointmentModel=mongoose.model<IAppointmentEntity>("appointments",appointmentSchema)