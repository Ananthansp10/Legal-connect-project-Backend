import { Types } from "mongoose";
import { IReportRepository, ReportDataRequestDto, Reports } from "../repositoryInterface/IReportReposiitory";
import { IReportAccountEntity } from "../../../admin/domain/entity/reportAccountEntity";
import { reportAccountModel } from "../../../admin/infrastructure/models/reportAccountsModel";


export class ReportRepository implements IReportRepository {

    async reportLawyer(data: IReportAccountEntity): Promise<void> {
        await reportAccountModel.create(data)
    }

    async findLawyerReportExist(lawyerId: Types.ObjectId): Promise<IReportAccountEntity | null> {
        return await reportAccountModel.findOne({ reportedId: lawyerId })
    }

    async updateLawyerReport(lawyerId: Types.ObjectId, data: Reports): Promise<void> {
        await reportAccountModel.updateOne({ reportedId: lawyerId }, { $push: { reports: data, }, $set: { status: 'Pending' } })
    }
}