import { SummaryReportDto } from "../../domain/dtos/summaryReportDto";


export interface IGetSummaryReportUseCase {
    execute(): Promise<SummaryReportDto>
}