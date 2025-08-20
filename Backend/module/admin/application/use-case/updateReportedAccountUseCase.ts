import { Types } from "mongoose";
import { IReportedAccountsRepository } from "../../infrastructure/repositoryInterface/IReportedAccountsRepository";
import { IUpdateReportedAccountStatusUseCase } from "../use-case-interface/IUpdateReportAccountStatusUseCase";


export class UpdateReportedAccountUseCase implements IUpdateReportedAccountStatusUseCase{

    constructor(
        private _reportedAccountRepo:IReportedAccountsRepository
    ){}

    async execute(reportedAccountId: Types.ObjectId): Promise<void> {
        await this._reportedAccountRepo.updateReportAccountStatus(reportedAccountId)
    }
}