import { Types } from "mongoose";

interface IUser {
  _id?: Types.ObjectId;
  name: string;
  profileImage: string;
}

export interface IAppointment {
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
    lawyerId: Types.ObjectId,
    appointmentStatus: string,
    startIndex: number,
    endIndex: number,
  ): Promise<{
    appointments: IAppointment[];
    totalAppointments: number;
  } | null>;
}
