import { IReportDataRequestDto as IReportDataRequestDto } from "../../infrastructure/repositoryInterface/IReportReposiitory";

export interface IReportLawyerUseCase {
  execute(data: IReportDataRequestDto): Promise<void>;
}
