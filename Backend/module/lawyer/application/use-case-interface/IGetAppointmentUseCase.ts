import { Types } from "mongoose";

interface User {
  _id?: Types.ObjectId;
  name: string;
  profileImage: string;
}

export interface Appointment {
  _id?: Types.ObjectId;
  user: User;
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
  ): Promise<{ appointments: Appointment[]; totalAppointments: number } | null>;
}
