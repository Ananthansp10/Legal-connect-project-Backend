import { IPlanSummaryReportResponseDto } from "../../domain/dtos/planSummaryReportDto";
import { IPlanManagementRepository } from "../../infrastructure/repositoryInterface/IPlanManagementRepository";
import { IGetPlanSummaryReportUseCase } from "../use-case-interface/IGetPlanSummaryReportUseCase";

export class GetPlanSummaryReportUseCase
  implements IGetPlanSummaryReportUseCase
{
  constructor(private _planRepo: IPlanManagementRepository) {}

  async execute(): Promise<IPlanSummaryReportResponseDto> {
    const [activePlans, inActivePlans, mostPopularPlan, totalMonthlyRevenue] =
      await Promise.all([
        this._planRepo.getActivePlans(),
        this._planRepo.getInActivePlans(),
        this._planRepo.getMostPopularPlan(),
        this._planRepo.getMonthlyIncome(),
      ]);
    return {
      activePlans: activePlans ?? 0,
      inActivePlans: inActivePlans ?? 0,
      mostPopularPlan: mostPopularPlan ?? "",
      totalMonthlyRevenue: totalMonthlyRevenue ?? 0,
    };
  }
}
