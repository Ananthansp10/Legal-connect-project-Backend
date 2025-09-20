import { LawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { UserProfileEntitie } from "../../../user/domain/entity/userProfileUserEntity";
import { ReportAccountDto } from "../../domain/dtos/reportAccountDto";
import { IReportAccountEntity } from "../../domain/entity/reportAccountEntity";
import { IReportedAccountsRepository } from "../../infrastructure/repositoryInterface/IReportedAccountsRepository";



export class ReportedAccountsMapper {

    static async toResponse(reportedAccounts: IReportAccountEntity[], reportedAccountRepo: IReportedAccountsRepository): Promise<ReportAccountDto[] | null> {
        const results = await Promise.all(
            reportedAccounts?.map(async (accounts) => {
                let reportedAccountDetails
                if (accounts.status == 'user') {
                    reportedAccountDetails = await reportedAccountRepo.findUserDetails(accounts.reportedId)
                } else {
                    reportedAccountDetails = await reportedAccountRepo.findLawyerDetails(accounts.reportedId)
                }
                const reporteDetails = await Promise.all(
                    accounts.reports.map(async (reporters) => {
                        let reporterDetails
                        if (accounts.userType == 'user') {
                            reporterDetails = await reportedAccountRepo.findLawyerDetails(reporters.reporterId)
                        } else {
                            reporterDetails = await reportedAccountRepo.findUserDetails(reporters.reporterId)
                        }
                        return {
                            reporterId: reporters.reporterId,
                            reporterName: accounts.userType == 'user' ? (reporterDetails as LawyerProfileEntity).personalInfo.name : (reporterDetails as UserProfileEntitie).name,
                            date: reporters.date,
                            reason: reporters.reason,
                            description: reporters.description
                        }
                    })
                )

                return {
                    _id: accounts._id!,
                    reportedId: accounts.userType == 'user' ? (reportedAccountDetails as UserProfileEntitie).userId : (reportedAccountDetails as LawyerProfileEntity).lawyerId,
                    reportedName: accounts.userType == 'user' ? (reportedAccountDetails as UserProfileEntitie).name : (reportedAccountDetails as LawyerProfileEntity).personalInfo.name,
                    reportedUserProfileImage: accounts.userType == 'user' ? (reportedAccountDetails as UserProfileEntitie).profileImage : (reportedAccountDetails as LawyerProfileEntity).personalInfo.profileImage,
                    reportsCount: accounts.reports.length,
                    userType: accounts.userType,
                    latestReportReason: accounts.reports[accounts.reports.length - 1].reason,
                    reports: reporteDetails,
                    status: accounts.status
                }
            })
        )

        return results
    }
}