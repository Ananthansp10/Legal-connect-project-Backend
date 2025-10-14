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
exports.GetPurchasedPlansUseCase = void 0;
class GetPurchasedPlansUseCase {
  constructor(_planRepo) {
    this._planRepo = _planRepo;
  }
  execute(lawyerId) {
    return __awaiter(this, void 0, void 0, function* () {
      const plans = yield this._planRepo.findPlan(lawyerId);
      if (!plans || plans.plans.length == 0) {
        return null;
      }
      const result = yield Promise.all(
        plans.plans.map((plan) =>
          __awaiter(this, void 0, void 0, function* () {
            var _a;
            const planDetails = yield this._planRepo.getPlanDetails(
              plan.planId,
            );
            return {
              planId: plan.planId,
              planName:
                (_a =
                  planDetails === null || planDetails === void 0
                    ? void 0
                    : planDetails.name) !== null && _a !== void 0
                  ? _a
                  : "",
              date: plan.date,
              activationDate: plan.activationDate,
              expireDate: plan.expireDate,
              isActive: plan.isActive,
              totalAppointments: plan.totalAppointments,
              appointmentsCount: plan.appointmentsCount,
              price: plan.price,
            };
          }),
        ),
      );
      return { lawyerId: lawyerId, plans: result };
    });
  }
}
exports.GetPurchasedPlansUseCase = GetPurchasedPlansUseCase;
