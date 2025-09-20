import { ReportAccountDto } from "../../domain/dtos/reportAccountDto";


export interface IGetReportedAccountsUseCase {
    execute(userType: string): Promise<ReportAccountDto[] | null>;
}