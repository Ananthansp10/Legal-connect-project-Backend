import { Types } from "mongoose";
import { ILawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { IUserProfileEntitie } from "../../../user/domain/entity/userProfileUserEntity";
import { IReportAccountEntity } from "../../domain/entity/reportAccountEntity";
import { reportAccountModel } from "../models/reportAccountsModel";
import { IReportedAccountsRepository } from "../repositoryInterface/IReportedAccountsRepository";
import { userProfileModel } from "../../../user/infrastructure/models/userProfileModel";
import { lawyerProfileModel } from "../../../lawyer/infrastructure/models/lawyerProfileModel";

export class ReportAccountRepository implements IReportedAccountsRepository {
  async findReportedAccounts(
    userType: string,
    startIndex: number,
    limit: number,
  ): Promise<{
    reportedAccounts: IReportAccountEntity[];
    totalReportedAccounts: number;
  }> {
    let reportedAccounts = await reportAccountModel
      .find(
        userType == "All"
          ? { status: "Pending" }
          : { userType: userType, status: "Pending" },
      )
      .skip(startIndex)
      .limit(limit);
    let totalReportedAccounts = await reportAccountModel.countDocuments(
      userType == "All"
        ? { status: "Pending" }
        : { userType: userType, status: "Pending" },
    );
    return { reportedAccounts, totalReportedAccounts };
  }

  async findUserDetails(
    userId: Types.ObjectId,
  ): Promise<IUserProfileEntitie | null> {
    return await userProfileModel.findOne({ userId: userId });
  }

  async findLawyerDetails(
    lawyerId: Types.ObjectId,
  ): Promise<ILawyerProfileEntity | null> {
    return await lawyerProfileModel.findOne({ lawyerId: lawyerId });
  }

  async updateReportAccountStatus(
    reportAccountId: Types.ObjectId,
  ): Promise<void> {
    await reportAccountModel.findByIdAndUpdate(reportAccountId, {
      $set: { status: "Resolved" },
    });
  }
}
