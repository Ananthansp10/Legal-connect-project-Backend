import { Types } from "mongoose";

export interface TodaysAppointmentData{
  _id: Types.ObjectId;
  name: string;
  profileImage: string;
  date: string;
  time: string;
  mode: string;
  specialization: string;
}


export interface IGetTodaysAppointmentsUseCase{
    execute(userId:Types.ObjectId):Promise<TodaysAppointmentData[] | []>;
}