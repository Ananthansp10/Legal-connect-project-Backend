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
exports.ReportAccountRepository = void 0;
const reportAccountsModel_1 = require("../models/reportAccountsModel");
const userProfileModel_1 = require("../../../user/infrastructure/models/userProfileModel");
const lawyerProfileModel_1 = require("../../../lawyer/infrastructure/models/lawyerProfileModel");
class ReportAccountRepository {
  findReportedAccounts(userType, startIndex, limit) {
    return __awaiter(this, void 0, void 0, function* () {
      let reportedAccounts = yield reportAccountsModel_1.reportAccountModel
        .find(
          userType == "All"
            ? { status: "Pending" }
            : { userType: userType, status: "Pending" },
        )
        .skip(startIndex)
        .limit(limit);
      let totalReportedAccounts =
        yield reportAccountsModel_1.reportAccountModel.countDocuments(
          userType == "All"
            ? { status: "Pending" }
            : { userType: userType, status: "Pending" },
        );
      return { reportedAccounts, totalReportedAccounts };
    });
  }
  findUserDetails(userId) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield userProfileModel_1.userProfileModel.findOne({
        userId: userId,
      });
    });
  }
  findLawyerDetails(lawyerId) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield lawyerProfileModel_1.lawyerProfileModel.findOne({
        lawyerId: lawyerId,
      });
    });
  }
  updateReportAccountStatus(reportAccountId) {
    return __awaiter(this, void 0, void 0, function* () {
      yield reportAccountsModel_1.reportAccountModel.findByIdAndUpdate(
        reportAccountId,
        {
          $set: { status: "Resolved" },
        },
      );
    });
  }
}
exports.ReportAccountRepository = ReportAccountRepository;
