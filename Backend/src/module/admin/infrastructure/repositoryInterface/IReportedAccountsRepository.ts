import { Types } from "mongoose";
import { IReportAccountEntity } from "../../domain/entity/reportAccountEntity";
import { IUserProfileEntitie } from "../../../user/domain/entity/userProfileUserEntity";
import { ILawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";

export interface IReportedAccountsRepository {
  findReportedAccounts(
    userType: string,
    startIndex: number,
    limit: number,
  ): Promise<{
    reportedAccounts: IReportAccountEntity[] | null;
    totalReportedAccounts: number;
  }>;
  findUserDetails(userId: Types.ObjectId): Promise<IUserProfileEntitie | null>;
  findLawyerDetails(
    lawyerId: Types.ObjectId,
  ): Promise<ILawyerProfileEntity | null>;
  updateReportAccountStatus(reportAccountId: Types.ObjectId): Promise<void>;
}
