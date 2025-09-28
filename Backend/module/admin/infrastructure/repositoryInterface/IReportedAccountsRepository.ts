import { Types } from "mongoose";
import { IReportAccountEntity } from "../../domain/entity/reportAccountEntity";
import { UserProfileEntitie } from "../../../user/domain/entity/userProfileUserEntity";
import { LawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";



export interface IReportedAccountsRepository {
    findReportedAccounts(userType: string, startIndex: number, limit: number): Promise<{ reportedAccounts: IReportAccountEntity[] | null, totalReportedAccounts: number }>;
    findUserDetails(userId: Types.ObjectId): Promise<UserProfileEntitie | null>;
    findLawyerDetails(lawyerId: Types.ObjectId): Promise<LawyerProfileEntity | null>
    updateReportAccountStatus(reportAccountId: Types.ObjectId): Promise<void>;
}