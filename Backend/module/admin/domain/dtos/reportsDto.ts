import { LawyerDetailsDto } from "./lawyerDetailsDto";
import { RevenueDateChartDto } from "./revenueDateChartDto";
import { SpecializationCategoryChartDto } from "./specializationCategoryChartDto";
import { SpecializationReportDto } from "./specializationReportDto";
import { StateReportDto } from "./stateReportDto";


export interface ReportsDto {
    totalRevenue: number;
    totalAppointments: number;
    totalUsers: number;
    totalSubscribedLawyers: number;
    subscriptionPlanReport: SpecializationReportDto[];
    stateReport: StateReportDto[];
    lawyerDetails: LawyerDetailsDto[];
    revenueDateChart: RevenueDateChartDto[];
    specializationChart: SpecializationCategoryChartDto[];
}