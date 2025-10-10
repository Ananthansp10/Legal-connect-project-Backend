import { Types } from "mongoose";
import { IUserSignup } from "../../../auth/userAuth/domain/userRegisterEntity";
import { ILawyerSignup } from "../../../auth/lawyerAuth/domain/entity/lawyerEntity";

export interface IHistory {
  consultationDate: string;
  summaryNote: string;
  consultationMode: string;
  feedback: string;
  rating: number;
}

export interface IConsultationHistoryRequestDto {
  _id?: Types.ObjectId;
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
  notes?: string;
  feedback?: string;
  rating?: number;
  caseId?: number;
  userDetails: IUserSignup;
  lawyerDetails: ILawyerSignup;
}

export interface IConsultationHistoryResponseDto {
  userName: string;
  lawyerName: string;
  caseId: number;
  caseDescription: string;
  history: IHistory;
}
