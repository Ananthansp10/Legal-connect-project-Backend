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
exports.UpdateAppointmentStatusUseCase = void 0;
const errorException_1 = require("../../../../common/error/errorException");
const appointmentStatus_1 = require("../../../../common/status/appointmentStatus");
class UpdateAppointmentStatusUseCase {
  constructor(_appointmentRepo, _planRepo, _bankRepo) {
    this._appointmentRepo = _appointmentRepo;
    this._planRepo = _planRepo;
    this._bankRepo = _bankRepo;
  }
  execute(appointmentId, appointmentStatus, lawyerId) {
    return __awaiter(this, void 0, void 0, function* () {
      if (appointmentStatus == appointmentStatus_1.AppointmentStatus.ACCEPTED) {
        const subscribed = yield this._planRepo.findPlan(lawyerId);
        if (!subscribed) {
          throw new errorException_1.AppException(
            "Cant accept ! please subscribe to continue",
            403,
          );
        } else {
          const isBankDetailsExist =
            yield this._bankRepo.findBankDetails(lawyerId);
          if (!isBankDetailsExist) {
            throw new errorException_1.AppException(
              "First add your bank details for accepting the appointment",
              403,
            );
          }
          const checkActivePlan = subscribed.plans.filter(
            (plan) => plan.isActive,
          );
          if (checkActivePlan.length == 0) {
            throw new errorException_1.AppException(
              "Cant accept ! your plan has been expired ! please subscribe to continue",
              403,
            );
          }
          yield this._appointmentRepo.updateStatus(
            appointmentId,
            appointmentStatus,
          );
          yield this._planRepo.updatePlanAppointment(
            lawyerId,
            checkActivePlan[0].planId,
          );
        }
      } else {
        yield this._appointmentRepo.updateStatus(
          appointmentId,
          appointmentStatus,
        );
      }
    });
  }
}
exports.UpdateAppointmentStatusUseCase = UpdateAppointmentStatusUseCase;
