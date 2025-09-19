import { CountryChartDto } from "./countryChartDto";
import { RevenueChartDto } from "./revenueChartDto";
import { SpecializationData } from "./specializationChartDto";
import { StateChartDto } from "./stateChartDto";
import { TopLawyersDto } from "./topLawyersDto";
import { TopUserssDto } from "./topUsersDto";
import { WeeklyAppointmentsDto } from "./weeklyAppointmentDto";


export interface SummaryReportDto{
    totalUsers:number;
    totalLawyers:number;
    todaysAppointments:number;
    pendingVerification:number;
    revenueChart:RevenueChartDto[];
    weeklyAppointments:WeeklyAppointmentsDto[];
    specializationChart:SpecializationData[];
    topLawyers:TopLawyersDto[];
    topUsers:TopUserssDto[];
    stateChart:StateChartDto[];
    countryChart:CountryChartDto[];
}