import { IPlanSummaryReportResponseDto } from "../../domain/dtos/planSummaryReportDto";

export interface IGetPlanSummaryReportUseCase {
  execute(): Promise<IPlanSummaryReportResponseDto>;
}
