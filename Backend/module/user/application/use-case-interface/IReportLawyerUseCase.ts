import { ReportDataRequestDto as ReportDataRequestDto } from "../../infrastructure/repositoryInterface/IReportReposiitory";

export interface IReportLawyerUseCase {
  execute(data: ReportDataRequestDto): Promise<void>;
}
