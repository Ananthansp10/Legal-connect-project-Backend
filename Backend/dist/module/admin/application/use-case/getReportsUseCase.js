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
exports.GetReportsUseCase = void 0;
class GetReportsUseCase {
  constructor(_reportsRepo) {
    this._reportsRepo = _reportsRepo;
  }
  execute(revenueDateRange, specializationType) {
    return __awaiter(this, void 0, void 0, function* () {
      let totalRevenue = (yield this._reportsRepo.getTotalRevenue()) || 0;
      let totalAppointments =
        (yield this._reportsRepo.getTotalAppointments()) || 0;
      let totalUsers = (yield this._reportsRepo.getTotalUsers()) || 0;
      let totalSubscribedLawyers =
        (yield this._reportsRepo.getTotalSubscribedLawyers()) || 0;
      let subscriptionPlanReport =
        (yield this._reportsRepo.getSubscriptionPlanReport()) || [];
      let stateReport = (yield this._reportsRepo.getStateReport()) || [];
      let lawyerDetails = (yield this._reportsRepo.getLawyerDetails()) || [];
      let revenueDateChart =
        (yield this._reportsRepo.getRevenueDateChart(revenueDateRange)) || [];
      let specializationChart =
        (yield this._reportsRepo.getSpecializationChart(specializationType)) ||
        [];
      return {
        totalRevenue,
        totalAppointments,
        totalUsers,
        totalSubscribedLawyers,
        subscriptionPlanReport,
        stateReport,
        lawyerDetails,
        revenueDateChart,
        specializationChart,
      };
    });
  }
}
exports.GetReportsUseCase = GetReportsUseCase;
