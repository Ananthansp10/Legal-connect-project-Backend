import { Types } from "mongoose";


export interface IAppointmentEntity{
    lawyerId:Types.ObjectId;
    userId:Types.ObjectId;
    date:string;
    time:string;
    consultationMode:string;
    problem:string;
    appointmentStatus:string;
}