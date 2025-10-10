import { ILawyerDetailsDto } from "./lawyerDetailsDto";
import { IRevenueDateChartDto } from "./revenueDateChartDto";
import { ISpecializationCategoryChartDto } from "./specializationCategoryChartDto";
import { ISpecializationReportDto } from "./specializationReportDto";
import { IStateReportDto } from "./stateReportDto";

export interface IReportsDto {
  totalRevenue: number;
  totalAppointments: number;
  totalUsers: number;
  totalSubscribedLawyers: number;
  subscriptionPlanReport: ISpecializationReportDto[];
  stateReport: IStateReportDto[];
  lawyerDetails: ILawyerDetailsDto[];
  revenueDateChart: IRevenueDateChartDto[];
  specializationChart: ISpecializationCategoryChartDto[];
}
