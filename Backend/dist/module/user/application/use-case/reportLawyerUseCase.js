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
exports.ReportLawyerUseCase = void 0;
class ReportLawyerUseCase {
  constructor(_reportRepo) {
    this._reportRepo = _reportRepo;
  }
  execute(data) {
    return __awaiter(this, void 0, void 0, function* () {
      const findLawyerReport = yield this._reportRepo.findLawyerReportExist(
        data.reportedId,
      );
      if (findLawyerReport) {
        const dataObj = {
          reason: data.reason,
          description: data.description,
          reporterId: data.reporterId,
          date: new Date().toLocaleString(),
        };
        yield this._reportRepo.updateLawyerReport(data.reportedId, dataObj);
      } else {
        const reportObj = {
          reportedId: data.reportedId,
          userType: data.userType,
          reports: [
            {
              reason: data.reason,
              description: data.description,
              reporterId: data.reporterId,
              date: new Date().toLocaleString(),
            },
          ],
          status: "Pending",
        };
        yield this._reportRepo.reportLawyer(reportObj);
      }
    });
  }
}
exports.ReportLawyerUseCase = ReportLawyerUseCase;
