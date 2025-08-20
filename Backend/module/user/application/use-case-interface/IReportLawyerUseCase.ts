import { ReportData } from "../../infrastructure/repositoryInterface/IReportReposiitory";


export interface IReportLawyerUseCase{
    execute(data:ReportData):Promise<void>;
}