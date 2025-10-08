import { ReportAccountDto } from "../../domain/dtos/reportAccountDto";

export interface IGetReportedAccountsUseCase {
  execute(
    userType: string,
    startIndex: number,
    limit: number,
  ): Promise<{
    reportedAccounts: ReportAccountDto[] | null;
    totalReportedAccounts: number;
  } | null>;
}
