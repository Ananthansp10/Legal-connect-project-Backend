import { LawyerDetailsDto } from "../../domain/dtos/lawyerDetailsDto";
import { SpecializationReportDto } from "../../domain/dtos/specializationReportDto";
import { StateReportDto } from "../../domain/dtos/stateReportDto";




export interface IReportsRepository{
    getTotalRevenue():Promise<number>;
    getTotalAppointments():Promise<number>;
    getTotalUsers():Promise<number>;
    getTotalSubscribedLawyers():Promise<number>;
    getSubscriptionPlanReport():Promise<SpecializationReportDto[] | null>;
    getStateReport():Promise<StateReportDto[] | null>;
    getLawyerDetails():Promise<LawyerDetailsDto[] | null>;
}