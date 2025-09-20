import { ReportAccountDto } from "../../domain/dtos/reportAccountDto";
import { IReportedAccountsRepository } from "../../infrastructure/repositoryInterface/IReportedAccountsRepository";
import { ReportedAccountsMapper } from "../mapper/reportedAccountsMapper";
import { IGetReportedAccountsUseCase } from "../use-case-interface/IGetReportedAccountsUseCase";


export class GetReportedAccountsUseCase implements IGetReportedAccountsUseCase{

    constructor(
        private _reportedAccountsRepo:IReportedAccountsRepository
    ){}

    async execute(userType: string): Promise<ReportAccountDto[] | null> {
        const reportedAccounts=await this._reportedAccountsRepo.findReportedAccounts(userType)
        return await ReportedAccountsMapper.toResponse(reportedAccounts,this._reportedAccountsRepo)
    }
}