import { ICountryChartDto } from "./countryChartDto";
import { IRevenueChartDto } from "./revenueChartDto";
import { ISpecializationData } from "./specializationChartDto";
import { IStateChartDto } from "./stateChartDto";
import { ITopLawyersDto } from "./topLawyersDto";
import { ITopUserssDto } from "./topUsersDto";
import { IWeeklyAppointmentsDto } from "./weeklyAppointmentDto";

export interface ISummaryReportDto {
  totalUsers: number;
  totalLawyers: number;
  todaysAppointments: number;
  pendingVerification: number;
  revenueChart: IRevenueChartDto[];
  weeklyAppointments: IWeeklyAppointmentsDto[];
  specializationChart: ISpecializationData[];
  topLawyers: ITopLawyersDto[];
  topUsers: ITopUserssDto[];
  stateChart: IStateChartDto[];
  countryChart: ICountryChartDto[];
}
