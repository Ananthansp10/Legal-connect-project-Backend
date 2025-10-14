import { Types } from "mongoose";

export interface IAppointmentRequestDto {
  _id?: Types.ObjectId;
  lawyerId: Types.ObjectId;
  userId: Types.ObjectId;
  date: string;
  time: string;
  consultationMode: string;
  problem: string;
  fee: number;
  appointmentStatus: string;
  payment?: string;
  paymentId?: string;
  refundStatus?: string;
  paymentDate?: string;
  meetStart?: boolean;
}
