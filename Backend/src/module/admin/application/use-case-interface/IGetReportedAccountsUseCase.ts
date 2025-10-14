import { IReportAccountDto } from "../../domain/dtos/reportAccountDto";

export interface IGetReportedAccountsUseCase {
  execute(
    userType: string,
    startIndex: number,
    limit: number,
  ): Promise<{
    reportedAccounts: IReportAccountDto[] | null;
    totalReportedAccounts: number;
  } | null>;
}
