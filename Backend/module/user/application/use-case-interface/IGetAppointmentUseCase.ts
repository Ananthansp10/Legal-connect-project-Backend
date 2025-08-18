import { Types } from "mongoose";


interface LawyerData{
    _id:Types.ObjectId;
    name:string;
    specialization:string[];
    profileImage:string;
    fee:string;
}

export interface AppointmentsData{
    _id:Types.ObjectId
    lawyer:LawyerData;
    date:string;
    time:string;
    mode:string;
    status:string;
    payment?:string;
  }


export interface IGetAppointmentUseCase{
    execute(userId:Types.ObjectId,appointmentStatus:string):Promise<AppointmentsData[] | null>;
}