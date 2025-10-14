import { Types } from "mongoose";
import { ILawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { IRevenueChartDto } from "../../domain/dtos/revenueChartDto";
import { ISpecializationChartDto } from "../../domain/dtos/specializationChartDto";
import { IWeeklyAppointmentsDto } from "../../domain/dtos/weeklyAppointmentDto";
import { IAppointmentEntity } from "../../../user/domain/entity/appointmentEntity";
import { ILawyerSignup } from "../../../auth/lawyerAuth/domain/entity/lawyerEntity";
import { IFeedbackEntity } from "../../../user/domain/entity/feedbackEntity";
import { IUserSignup } from "../../../auth/userAuth/domain/userRegisterEntity";
import { IUserProfileEntitie } from "../../../user/domain/entity/userProfileUserEntity";
import { IStateChartDto } from "../../domain/dtos/stateChartDto";
import { ICountryChartDto } from "../../domain/dtos/countryChartDto";

export interface ISummaryReportRepository {
  getTotalUsers(): Promise<number | null>;
  getTotalLawyers(): Promise<number | null>;
  getTodaysAppointments(): Promise<number | null>;
  getTotalUnverifiedLawyers(): Promise<number | null>;
  getRevenueChart(): Promise<IRevenueChartDto[] | null>;
  getWeeklyAppointments(): Promise<IWeeklyAppointmentsDto[] | null>;
  getSpecializationChart(): Promise<ISpecializationChartDto[] | null>;
  getLawyerProfile(
    lawyerId: Types.ObjectId,
  ): Promise<ILawyerProfileEntity | null>;
  getLawyerApppointments(
    lawyerId: Types.ObjectId,
  ): Promise<IAppointmentEntity[] | null>;
  getLawyers(): Promise<ILawyerSignup[] | null>;
  getLawyerRating(lawyerId: Types.ObjectId): Promise<IFeedbackEntity | null>;
  getUsers(): Promise<IUserSignup[] | null>;
  getUserProfile(userId: Types.ObjectId): Promise<IUserProfileEntitie | null>;
  getUserAppointments(
    userId: Types.ObjectId,
  ): Promise<IAppointmentEntity[] | null>;
  getStateChart(): Promise<IStateChartDto[] | null>;
  getCountryChart(): Promise<ICountryChartDto[] | null>;
}
