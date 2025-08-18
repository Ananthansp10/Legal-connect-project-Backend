import { Types } from "mongoose";
import { IReportRepository } from "../repositoryInterface/IReportReposiitory";
import { lawyerProfileModel } from "../../../lawyer/infrastructure/models/lawyerProfileModel";


export class ReportRepository implements IReportRepository{

    async reportLawyer(lawyerId: Types.ObjectId): Promise<void> {
        await lawyerProfileModel.updateOne({lawyerId:lawyerId},{$set:{isReported:true},$inc:{reportCount:1}})
    }
}