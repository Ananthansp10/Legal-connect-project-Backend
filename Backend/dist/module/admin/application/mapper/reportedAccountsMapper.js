"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportedAccountsMapper = void 0;
class ReportedAccountsMapper {
  static toResponse(reportedAccounts, reportedAccountRepo) {
    return __awaiter(this, void 0, void 0, function* () {
      const results = yield Promise.all(
        reportedAccounts === null || reportedAccounts === void 0
          ? void 0
          : reportedAccounts.map((accounts) =>
              __awaiter(this, void 0, void 0, function* () {
                let reportedAccountDetails;
                if (accounts.userType == "user") {
                  reportedAccountDetails =
                    yield reportedAccountRepo.findUserDetails(
                      accounts.reportedId,
                    );
                } else {
                  reportedAccountDetails =
                    yield reportedAccountRepo.findLawyerDetails(
                      accounts.reportedId,
                    );
                }
                const reporteDetails = yield Promise.all(
                  accounts.reports.map((reporters) =>
                    __awaiter(this, void 0, void 0, function* () {
                      let reporterDetails;
                      if (accounts.userType == "user") {
                        reporterDetails =
                          yield reportedAccountRepo.findLawyerDetails(
                            reporters.reporterId,
                          );
                      } else {
                        reporterDetails =
                          yield reportedAccountRepo.findUserDetails(
                            reporters.reporterId,
                          );
                      }
                      return {
                        reporterId: reporters.reporterId,
                        reporterName:
                          accounts.userType == "user"
                            ? reporterDetails.personalInfo.name
                            : reporterDetails.name,
                        date: reporters.date,
                        reason: reporters.reason,
                        description: reporters.description,
                      };
                    }),
                  ),
                );
                return {
                  _id: accounts._id,
                  reportedId:
                    accounts.userType == "user"
                      ? reportedAccountDetails.userId
                      : reportedAccountDetails.lawyerId,
                  reportedName:
                    accounts.userType == "user"
                      ? reportedAccountDetails.name
                      : reportedAccountDetails.personalInfo.name,
                  reportedUserProfileImage:
                    accounts.userType == "user"
                      ? reportedAccountDetails.profileImage
                      : reportedAccountDetails.personalInfo.profileImage,
                  reportsCount: accounts.reports.length,
                  userType: accounts.userType,
                  latestReportReason:
                    accounts.reports[accounts.reports.length - 1].reason,
                  reports: reporteDetails,
                  status: accounts.status,
                };
              }),
            ),
      );
      return results;
    });
  }
}
exports.ReportedAccountsMapper = ReportedAccountsMapper;
