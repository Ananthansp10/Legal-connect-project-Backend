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
exports.GetPlanSummaryReportUseCase = void 0;
class GetPlanSummaryReportUseCase {
  constructor(_planRepo) {
    this._planRepo = _planRepo;
  }
  execute() {
    return __awaiter(this, void 0, void 0, function* () {
      const [activePlans, inActivePlans, mostPopularPlan, totalMonthlyRevenue] =
        yield Promise.all([
          this._planRepo.getActivePlans(),
          this._planRepo.getInActivePlans(),
          this._planRepo.getMostPopularPlan(),
          this._planRepo.getMonthlyIncome(),
        ]);
      return {
        activePlans:
          activePlans !== null && activePlans !== void 0 ? activePlans : 0,
        inActivePlans:
          inActivePlans !== null && inActivePlans !== void 0
            ? inActivePlans
            : 0,
        mostPopularPlan:
          mostPopularPlan !== null && mostPopularPlan !== void 0
            ? mostPopularPlan
            : "",
        totalMonthlyRevenue:
          totalMonthlyRevenue !== null && totalMonthlyRevenue !== void 0
            ? totalMonthlyRevenue
            : 0,
      };
    });
  }
}
exports.GetPlanSummaryReportUseCase = GetPlanSummaryReportUseCase;
