import { Types } from "mongoose";

interface ILawyerData {
  _id: Types.ObjectId;
  name: string;
  specialization: string[];
  profileImage: string;
  fee: string;
}

export interface IAppointmentsData {
  _id: Types.ObjectId;
  lawyer: ILawyerData;
  date: string;
  time: string;
  mode: string;
  status: string;
  payment?: string;
  problem: string;
  fee: number;
  paymentDate?: string;
  meetStart?: boolean;
  notes?: string;
  caseId?: number;
}

export interface IGetAppointmentUseCase {
  execute(
    userId: Types.ObjectId,
    appointmentStatus: string,
    startIndex: number,
    limit: number,
  ): Promise<{
    appointments: IAppointmentsData[];
    totalAppointments: number;
  } | null>;
}
