import { ReportAccountDto } from "../../domain/dtos/reportAccountDto";
import { IReportedAccountsRepository } from "../../infrastructure/repositoryInterface/IReportedAccountsRepository";
import { ReportedAccountsMapper } from "../mapper/reportedAccountsMapper";
import { IGetReportedAccountsUseCase } from "../use-case-interface/IGetReportedAccountsUseCase";


export class GetReportedAccountsUseCase implements IGetReportedAccountsUseCase {

    constructor(
        private _reportedAccountsRepo: IReportedAccountsRepository
    ) { }

    async execute(userType: string, startIndex: number, limit: number): Promise<{ reportedAccounts: ReportAccountDto[] | null, totalReportedAccounts: number } | null> {
        const reportedAccounts = await this._reportedAccountsRepo.findReportedAccounts(userType, startIndex, limit)
        return {reportedAccounts:await ReportedAccountsMapper.toResponse(reportedAccounts.reportedAccounts || [], this._reportedAccountsRepo), totalReportedAccounts:reportedAccounts.totalReportedAccounts}
    }
}