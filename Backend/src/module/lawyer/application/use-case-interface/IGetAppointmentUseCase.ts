import { Types } from "mongoose";

interface IUser {
  _id?: Types.ObjectId | string;
  name: string;
  profileImage: string;
  email: string;
  phoneNumber: string;
  proffession: string;
}

export interface IAppointmentResponseDto {
  _id?: Types.ObjectId;
  user: IUser;
  problem: string;
  date: string;
  time: string;
  mode: string;
  status: string;
  payment: string;
  fee: number;
  paymentDate?: string;
  notes?: string;
}

export interface IGetAppointmentUseCase {
  execute(
    lawyerId: string,
    appointmentStatus: string,
    startIndex: number,
    endIndex: number,
  ): Promise<{
    appointments: IAppointmentResponseDto[];
    totalAppointments: number;
  } | null>;
}
