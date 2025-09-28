import { ReportsDto } from "../../domain/dtos/reportsDto";
import { IReportsRepository } from "../../infrastructure/repositoryInterface/IReportsRepository";
import { IGetReportsUseCase } from "../use-case-interface/IGetReportsUseCase";


export class GetReportsUseCase implements IGetReportsUseCase {

    constructor(
        private _reportsRepo: IReportsRepository
    ) { }

    async execute(revenueDateRange: string, specializationType: string): Promise<ReportsDto> {
        let totalRevenue = await this._reportsRepo.getTotalRevenue() || 0
        let totalAppointments = await this._reportsRepo.getTotalAppointments() || 0
        let totalUsers = await this._reportsRepo.getTotalUsers() || 0
        let totalSubscribedLawyers = await this._reportsRepo.getTotalSubscribedLawyers() || 0
        let subscriptionPlanReport = await this._reportsRepo.getSubscriptionPlanReport() || []
        let stateReport = await this._reportsRepo.getStateReport() || []
        let lawyerDetails = await this._reportsRepo.getLawyerDetails() || []
        let revenueDateChart = await this._reportsRepo.getRevenueDateChart(revenueDateRange) || []
        let specializationChart = await this._reportsRepo.getSpecializationChart(specializationType) || []

        return {
            totalRevenue,
            totalAppointments,
            totalUsers,
            totalSubscribedLawyers,
            subscriptionPlanReport,
            stateReport,
            lawyerDetails,
            revenueDateChart,
            specializationChart
        }
    }
}