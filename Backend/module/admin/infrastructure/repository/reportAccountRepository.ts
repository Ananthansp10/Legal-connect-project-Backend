import { Types } from "mongoose";
import { LawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { UserProfileEntitie } from "../../../user/domain/entity/userProfileUserEntity";
import { IReportAccountEntity } from "../../domain/entity/reportAccountEntity";
import { reportAccountModel } from "../models/reportAccountsModel";
import { IReportedAccountsRepository } from "../repositoryInterface/IReportedAccountsRepository";
import { userProfileModel } from "../../../user/infrastructure/models/userProfileModel";
import { lawyerProfileModel } from "../../../lawyer/infrastructure/models/lawyerProfileModel";


export class ReportAccountRepository implements IReportedAccountsRepository {

    async findReportedAccounts(userType: string): Promise<IReportAccountEntity[]> {
        return await reportAccountModel.find(userType == 'All' ? { status: 'Pending' } : { userType: userType, status: 'Pending' })
    }

    async findUserDetails(userId: Types.ObjectId): Promise<UserProfileEntitie | null> {
        return await userProfileModel.findOne({ userId: userId })
    }

    async findLawyerDetails(lawyerId: Types.ObjectId): Promise<LawyerProfileEntity | null> {
        return await lawyerProfileModel.findOne({ lawyerId: lawyerId })
    }

    async updateReportAccountStatus(reportAccountId: Types.ObjectId): Promise<void> {
        await reportAccountModel.findByIdAndUpdate(reportAccountId, { $set: { status: 'Resolved' } })
    }
}