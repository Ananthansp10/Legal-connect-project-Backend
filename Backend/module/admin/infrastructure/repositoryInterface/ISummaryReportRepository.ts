import { Types } from "mongoose";
import { LawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { RevenueChartDto } from "../../domain/dtos/revenueChartDto";
import { SpecializationChartDto } from "../../domain/dtos/specializationChartDto";
import { WeeklyAppointmentsDto } from "../../domain/dtos/weeklyAppointmentDto";
import { IAppointmentEntity } from "../../../user/domain/entity/appointmentEntity";
import { ILawyerSignup } from "../../../auth/lawyerAuth/domain/entity/lawyerEntity";
import { FeedbackEntity } from "../../../user/domain/entity/feedbackEntity";
import { IUserSignup } from "../../../auth/userAuth/domain/userRegisterEntity";
import { UserProfileEntitie } from "../../../user/domain/entity/userProfileUserEntity";
import { StateChartDto } from "../../domain/dtos/stateChartDto";
import { CountryChartDto } from "../../domain/dtos/countryChartDto";



export interface ISummaryReportRepository{
    getTotalUsers():Promise<number | null>;
    getTotalLawyers():Promise<number | null>;
    getTodaysAppointments():Promise<number | null>;
    getTotalUnverifiedLawyers():Promise<number | null>;
    getRevenueChart():Promise<RevenueChartDto[] | null>;
    getWeeklyAppointments():Promise<WeeklyAppointmentsDto[] | null>;
    getSpecializationChart():Promise<SpecializationChartDto[] | null>;
    getLawyerProfile(lawyerId:Types.ObjectId):Promise<LawyerProfileEntity | null>;
    getLawyerApppointments(lawyerId:Types.ObjectId):Promise<IAppointmentEntity[] | null>;
    getLawyers():Promise<ILawyerSignup[] | null>;
    getLawyerRating(lawyerId:Types.ObjectId):Promise<FeedbackEntity | null>;
    getUsers():Promise<IUserSignup[] | null>;
    getUserProfile(userId:Types.ObjectId):Promise<UserProfileEntitie | null>;
    getUserAppointments(userId:Types.ObjectId):Promise<IAppointmentEntity[] | null>;
    getStateChart():Promise<StateChartDto[] | null>;
    getCountryChart():Promise<CountryChartDto[] | null>;
}