import { ILawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { IUserProfileEntitie } from "../../../user/domain/entity/userProfileUserEntity";
import { IReportAccountDto } from "../../domain/dtos/reportAccountDto";
import { IReportAccountEntity } from "../../domain/entity/reportAccountEntity";
import { IReportedAccountsRepository } from "../../infrastructure/repositoryInterface/IReportedAccountsRepository";

export class ReportedAccountsMapper {
  static async toResponse(
    reportedAccounts: IReportAccountEntity[],
    reportedAccountRepo: IReportedAccountsRepository,
  ): Promise<IReportAccountDto[] | null> {
    const results = await Promise.all(
      reportedAccounts?.map(async (accounts) => {
        let reportedAccountDetails;
        if (accounts.status == "user") {
          reportedAccountDetails = await reportedAccountRepo.findUserDetails(
            accounts.reportedId,
          );
        } else {
          reportedAccountDetails = await reportedAccountRepo.findLawyerDetails(
            accounts.reportedId,
          );
        }
        const reporteDetails = await Promise.all(
          accounts.reports.map(async (reporters) => {
            let reporterDetails;
            if (accounts.userType == "user") {
              reporterDetails = await reportedAccountRepo.findLawyerDetails(
                reporters.reporterId,
              );
            } else {
              reporterDetails = await reportedAccountRepo.findUserDetails(
                reporters.reporterId,
              );
            }
            return {
              reporterId: reporters.reporterId,
              reporterName:
                accounts.userType == "user"
                  ? (reporterDetails as ILawyerProfileEntity).personalInfo.name
                  : (reporterDetails as IUserProfileEntitie).name,
              date: reporters.date,
              reason: reporters.reason,
              description: reporters.description,
            };
          }),
        );

        return {
          _id: accounts._id!,
          reportedId:
            accounts.userType == "user"
              ? (reportedAccountDetails as IUserProfileEntitie).userId
              : (reportedAccountDetails as ILawyerProfileEntity).lawyerId,
          reportedName:
            accounts.userType == "user"
              ? (reportedAccountDetails as IUserProfileEntitie).name
              : (reportedAccountDetails as ILawyerProfileEntity).personalInfo
                  .name,
          reportedUserProfileImage:
            accounts.userType == "user"
              ? (reportedAccountDetails as IUserProfileEntitie).profileImage
              : (reportedAccountDetails as ILawyerProfileEntity).personalInfo
                  .profileImage,
          reportsCount: accounts.reports.length,
          userType: accounts.userType,
          latestReportReason:
            accounts.reports[accounts.reports.length - 1].reason,
          reports: reporteDetails,
          status: accounts.status,
        };
      }),
    );

    return results;
  }
}
