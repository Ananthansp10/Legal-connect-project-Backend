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
exports.BookAppointmentUseCase = void 0;
const errorException_1 = require("../../../../common/error/errorException");
const appointmentStatus_1 = require("../../../../common/status/appointmentStatus");
class BookAppointmentUseCase {
  constructor(_bookAppointmentRepo) {
    this._bookAppointmentRepo = _bookAppointmentRepo;
  }
  execute(data, caseId) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const appointmentExist =
          yield this._bookAppointmentRepo.findAppointmentExist(
            data.lawyerId,
            data.date,
            data.time,
          );
        if (appointmentExist) {
          throw new errorException_1.AppException(
            "Appointment Already Taken",
            403,
          );
        }
        const customCaseId =
          caseId && !isNaN(Number(caseId)) ? parseInt(caseId) : Date.now();
        yield this._bookAppointmentRepo.create(
          Object.assign(Object.assign({}, data), {
            appointmentStatus: appointmentStatus_1.AppointmentStatus.PENDING,
            meetStart: false,
            caseId: customCaseId,
          }),
        );
      } catch (error) {
        console.log(error);
        throw error;
      }
    });
  }
}
exports.BookAppointmentUseCase = BookAppointmentUseCase;
