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
exports.AddPlanUseCase = void 0;
class AddPlanUseCase {
  constructor(_planRepo) {
    this._planRepo = _planRepo;
  }
  execute(lawyerId, planId, price) {
    return __awaiter(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      const planExist = yield this._planRepo.findPlan(lawyerId);
      const currentDate = new Date().toISOString().split("T")[0];
      const planDetails = yield this._planRepo.getPlanDetails(planId);
      const duration =
        (_a =
          planDetails === null || planDetails === void 0
            ? void 0
            : planDetails.duration) !== null && _a !== void 0
          ? _a
          : 0;
      const expireDate = new Date(currentDate);
      expireDate.setDate(new Date(currentDate).getDate() + duration);
      const lastPlanDetails =
        planExist === null || planExist === void 0
          ? void 0
          : planExist.plans[planExist.plans.length - 1];
      if (planExist) {
        const planExpireDate = new Date(
          (_b =
            lastPlanDetails === null || lastPlanDetails === void 0
              ? void 0
              : lastPlanDetails.expireDate) !== null && _b !== void 0
            ? _b
            : "",
        ).setDate(
          new Date(
            (_c =
              lastPlanDetails === null || lastPlanDetails === void 0
                ? void 0
                : lastPlanDetails.expireDate) !== null && _c !== void 0
              ? _c
              : "",
          ).getDate() +
            duration +
            1,
        );
        const activationDate = new Date(
          (_d =
            lastPlanDetails === null || lastPlanDetails === void 0
              ? void 0
              : lastPlanDetails.expireDate) !== null && _d !== void 0
            ? _d
            : "",
        ).setDate(
          new Date(
            (_e =
              lastPlanDetails === null || lastPlanDetails === void 0
                ? void 0
                : lastPlanDetails.expireDate) !== null && _e !== void 0
              ? _e
              : "",
          ).getDate() + 1,
        );
        let planObj = {
          planId: planId,
          date: currentDate,
          price: Number(price),
          activationDate: new Date(activationDate).toISOString().split("T")[0],
          expireDate: new Date(planExpireDate).toISOString().split("T")[0],
          isActive: false,
          totalAppointments: parseInt(
            (_f =
              planDetails === null || planDetails === void 0
                ? void 0
                : planDetails.totalAppointments) !== null && _f !== void 0
              ? _f
              : "0",
          ),
          appointmentsCount: 0,
        };
        yield this._planRepo.updatePlan(lawyerId, planObj);
      } else {
        let plan = {
          lawyerId: lawyerId,
          plans: [
            {
              planId: planId,
              date: currentDate,
              price: Number(price),
              activationDate: new Date().toISOString().split("T")[0],
              expireDate: expireDate.toISOString().split("T")[0],
              isActive: true,
              totalAppointments: isNaN(
                parseInt(
                  (_g =
                    planDetails === null || planDetails === void 0
                      ? void 0
                      : planDetails.totalAppointments) !== null && _g !== void 0
                    ? _g
                    : "0",
                ),
              )
                ? Infinity
                : parseInt(
                    (_h =
                      planDetails === null || planDetails === void 0
                        ? void 0
                        : planDetails.totalAppointments) !== null &&
                      _h !== void 0
                      ? _h
                      : "0",
                  ),
              appointmentsCount: 0,
            },
          ],
        };
        yield this._planRepo.addPlan(plan);
      }
    });
  }
}
exports.AddPlanUseCase = AddPlanUseCase;
