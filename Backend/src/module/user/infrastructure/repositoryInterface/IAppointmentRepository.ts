import { Types } from "mongoose";
import { IAppointmentEntity } from "../../domain/entity/appointmentEntity";
import { ILawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";

export interface IAppointmentRepository {
  findAppointmentByUserId(
    userId: Types.ObjectId,
    appointmentStatus: string,
    startIndex: number,
    limit: number,
  ): Promise<{
    appointments: IAppointmentEntity[];
    totalAppointments: number;
  } | null>;
  findLawyerDetails(
    lawyerId: Types.ObjectId,
  ): Promise<ILawyerProfileEntity | null>;
  updatePayment(
    appointmentId: Types.ObjectId,
    status: string,
    paymentId: string,
  ): Promise<void>;
  cancelAppointment(appointmentId: Types.ObjectId): Promise<void>;
  findAppointmentById(
    appointmentId: Types.ObjectId,
  ): Promise<IAppointmentEntity | null>;
  getTodaysAppointment(
    userId: Types.ObjectId,
    date: string,
  ): Promise<IAppointmentEntity[] | null>;
  resheduleAppointment(appointmentId: Types.ObjectId): Promise<void>;
  refundPayment(appointmentId: Types.ObjectId, status: string): Promise<void>;
  findCancelAppointment(lawyerId: Types.ObjectId, userId: Types.ObjectId,startWeek:Date,endWeek:Date): Promise<IAppointmentEntity[]>;
}
