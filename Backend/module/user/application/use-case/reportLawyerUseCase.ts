import { Types } from "mongoose";
import { IReportRepository, ReportData } from "../../infrastructure/repositoryInterface/IReportReposiitory";
import { IReportLawyerUseCase } from "../use-case-interface/IReportLawyerUseCase";
import { IReportAccountEntity } from "../../../admin/domain/entity/reportAccountEntity";


export class ReportLawyerUseCase implements IReportLawyerUseCase{

    constructor(
        private _reportRepo:IReportRepository
    ){}

    async execute(data:ReportData): Promise<void> {
        let findLawyerReport=await this._reportRepo.findLawyerReportExist(data.reportedId)
        if(findLawyerReport){
            let dataObj={
                reason:data.reason,
                description:data.description,
                reporterId:data.reporterId,
                date:new Date().toLocaleString()
            }
            await this._reportRepo.updateLawyerReport(data.reportedId,dataObj)
        }else{
            let reportObj={
                reportedId:data.reportedId,
                userType:data.userType,
                reports:[{
                    reason:data.reason,
                    description:data.description,
                    reporterId:data.reporterId,
                    date:new Date().toLocaleString()
                }],
                status:'Pending'
            }
            await this._reportRepo.reportLawyer(reportObj)
        }
    }
}