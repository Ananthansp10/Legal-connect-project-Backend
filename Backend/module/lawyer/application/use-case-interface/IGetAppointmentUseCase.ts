import { Types } from "mongoose";

interface User {
  _id ? : Types.ObjectId;
  name: string;
  profileImage: string;
}

export interface Appointment {
  _id ? : Types.ObjectId;
  user: User;
  problem: string;
  date: string;
  time: string;
  mode:string
  status:string
}

export interface IGetAppointmentUseCase{
    execute(lawyerId:Types.ObjectId,appointmentStatus:string):Promise<Appointment[] | null>;
}