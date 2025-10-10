import { ISummaryReportDto } from "../../domain/dtos/summaryReportDto";

export interface IGetSummaryReportUseCase {
  execute(): Promise<ISummaryReportDto>;
}
