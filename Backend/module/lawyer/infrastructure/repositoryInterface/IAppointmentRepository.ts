import { Types } from "mongoose";
import { IAppointmentEntity } from "../../../user/domain/entity/appointmentEntity";
import { UserProfileEntitie } from "../../../user/domain/entity/userProfileUserEntity";
import { ConsultationHistoryRequestDto } from "../../domain/dtos/consultationHistoryDto";


export interface IAppointmentRepository {
    getAppointments(lawyerId: Types.ObjectId, appointmentStatus: string, startIndex: number, endIndex: number): Promise<{ appointments: IAppointmentEntity[], totalAppointments: number } | null>;
    findUserDetails(userId: Types.ObjectId): Promise<UserProfileEntitie | null>;
    updateStatus(appointmentId: Types.ObjectId, appointmentStatus: string): Promise<void>;
    startMeet(appointmentId: Types.ObjectId): Promise<void>;
    addNotes(appointmentId: Types.ObjectId, note: string): Promise<void>;
    addFeedback(appointmentId: Types.ObjectId, review: { feedback: string, rating: number }): Promise<void>;
    getConsultationHistory(caseId: number):Promise<ConsultationHistoryRequestDto[] | null>;
}