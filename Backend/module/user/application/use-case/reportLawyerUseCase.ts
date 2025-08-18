import { Types } from "mongoose";
import { IReportRepository } from "../../infrastructure/repositoryInterface/IReportReposiitory";
import { IReportLawyerUseCase } from "../use-case-interface/IReportLawyerUseCase";


export class ReportLawyerUseCase implements IReportLawyerUseCase{

    constructor(
        private _reportRepo:IReportRepository
    ){}

    async execute(lawyerId: Types.ObjectId): Promise<void> {
        await this._reportRepo.reportLawyer(lawyerId)
    }
}