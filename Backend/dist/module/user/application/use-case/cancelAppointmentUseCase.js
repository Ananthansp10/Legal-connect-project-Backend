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
exports.CancelAppointmentUseCase = void 0;
const errorException_1 = require("../../../../common/error/errorException");
class CancelAppointmentUseCase {
  constructor(_appointmentRepo, _refundPaymentService) {
    this._appointmentRepo = _appointmentRepo;
    this._refundPaymentService = _refundPaymentService;
  }
  execute(appointmentId) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const appointment =
          yield this._appointmentRepo.findAppointmentById(appointmentId);
        const currentDate = new Date().toISOString().split("T")[0];
        if (appointment) {
          if (appointment.date > currentDate) {
            yield this._appointmentRepo.cancelAppointment(appointmentId);
            if (appointment.paymentId) {
              yield this._refundPaymentService.execute(
                appointmentId,
                appointment.paymentId,
              );
            }
          } else {
            throw new errorException_1.AppException(
              "Appointment can't cancel Today",
              403,
            );
          }
        }
      } catch (error) {
        throw error;
      }
    });
  }
}
exports.CancelAppointmentUseCase = CancelAppointmentUseCase;
