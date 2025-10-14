import { Types } from "mongoose";
import { IAppointmentEntity } from "../../../user/domain/entity/appointmentEntity";
import { IUserProfileEntitie } from "../../../user/domain/entity/userProfileUserEntity";
import { IConsultationHistoryRequestDto } from "../../domain/dtos/consultationHistoryDto";
import { IAppointmentDto } from "../../domain/dtos/appointmentDto";

export interface IAppointmentRepository {
  getAppointments(
    lawyerId: Types.ObjectId,
    appointmentStatus: string,
    startIndex: number,
    endIndex: number,
  ): Promise<{
    appointments: IAppointmentEntity[];
    totalAppointments: number;
  } | null>;
  findUserDetails(userId: Types.ObjectId): Promise<IUserProfileEntitie | null>;
  updateStatus(
    appointmentId: Types.ObjectId,
    appointmentStatus: string,
  ): Promise<void>;
  startMeet(appointmentId: Types.ObjectId): Promise<void>;
  addNotes(appointmentId: Types.ObjectId, note: string): Promise<void>;
  addFeedback(
    appointmentId: Types.ObjectId,
    review: { feedback: string; rating: number },
  ): Promise<void>;
  getConsultationHistory(
    caseId: number,
  ): Promise<IConsultationHistoryRequestDto[] | null>;
  searchAppointment(
    lawyerId: Types.ObjectId,
    userName: string,
  ): Promise<IAppointmentDto[] | null>;
}
