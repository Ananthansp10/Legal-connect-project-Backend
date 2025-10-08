import { Types } from "mongoose";

export interface ITodaysAppointmentResponseDataDto {
  _id: Types.ObjectId;
  name: string;
  profileImage: string;
  date: string;
  time: string;
  mode: string;
  specialization: string;
}

export interface IGetTodaysAppointmentsUseCase {
  execute(
    userId: Types.ObjectId,
  ): Promise<ITodaysAppointmentResponseDataDto[] | []>;
}
