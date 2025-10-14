import { ILawyerDetailsDto } from "../../domain/dtos/lawyerDetailsDto";
import { IRevenueDateChartDto } from "../../domain/dtos/revenueDateChartDto";
import { ISpecializationCategoryChartDto } from "../../domain/dtos/specializationCategoryChartDto";
import { ISpecializationReportDto } from "../../domain/dtos/specializationReportDto";
import { IStateReportDto } from "../../domain/dtos/stateReportDto";

export interface IReportsRepository {
  getTotalRevenue(): Promise<number>;
  getTotalAppointments(): Promise<number>;
  getTotalUsers(): Promise<number>;
  getTotalSubscribedLawyers(): Promise<number>;
  getSubscriptionPlanReport(): Promise<ISpecializationReportDto[] | null>;
  getStateReport(): Promise<IStateReportDto[] | null>;
  getLawyerDetails(): Promise<ILawyerDetailsDto[] | null>;
  getRevenueDateChart(
    dateRange: string,
  ): Promise<IRevenueDateChartDto[] | null>;
  getSpecializationChart(
    specializationType: string,
  ): Promise<ISpecializationCategoryChartDto[] | null>;
}
