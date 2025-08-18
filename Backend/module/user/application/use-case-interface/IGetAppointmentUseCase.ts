import { Types } from "mongoose";


interface LawyerData{
    name:string;
    specialization:string[];
    profileImage:string;
}

export interface AppointmentsData{
    lawyer:LawyerData;
    date:string;
    time:string;
    mode:string;
    status:string;
  }


export interface IGetAppointmentUseCase{
    execute(userId:Types.ObjectId,appointmentStatus:string):Promise<AppointmentsData[] | null>;
}