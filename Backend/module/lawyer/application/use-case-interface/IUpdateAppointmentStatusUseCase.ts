import { Types } from "mongoose";


export interface IUpdateAppointmentStatus{
    execute(appointmentId:Types.ObjectId,appointmentStatus:string):Promise<void>;
}