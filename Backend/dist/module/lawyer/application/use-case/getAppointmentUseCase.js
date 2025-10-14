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
exports.GetAppointmentUseCase = void 0;
const mongoose_1 = require("mongoose");
class GetAppointmentUseCase {
  constructor(_appointmentRepo) {
    this._appointmentRepo = _appointmentRepo;
  }
  execute(lawyerId, appointmentStatus, startIndex, endIndex) {
    return __awaiter(this, void 0, void 0, function* () {
      const appointments =
        (yield this._appointmentRepo.getAppointments(
          lawyerId,
          appointmentStatus,
          startIndex,
          endIndex,
        )) || null;
      if (
        !appointments ||
        (appointments === null || appointments === void 0
          ? void 0
          : appointments.appointments.length) == 0
      ) {
        return null;
      }
      const appointmentDetails = yield Promise.all(
        appointments.appointments.map((appointment) =>
          __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            const userDetails = yield this._appointmentRepo.findUserDetails(
              appointment.userId,
            );
            return {
              _id: appointment._id,
              user: {
                _id:
                  (_a =
                    userDetails === null || userDetails === void 0
                      ? void 0
                      : userDetails.userId) !== null && _a !== void 0
                    ? _a
                    : new mongoose_1.Types.ObjectId(""),
                name:
                  (_b =
                    userDetails === null || userDetails === void 0
                      ? void 0
                      : userDetails.name) !== null && _b !== void 0
                    ? _b
                    : "",
                profileImage:
                  (_c =
                    userDetails === null || userDetails === void 0
                      ? void 0
                      : userDetails.profileImage) !== null && _c !== void 0
                    ? _c
                    : "",
                email:
                  (_d =
                    userDetails === null || userDetails === void 0
                      ? void 0
                      : userDetails.email) !== null && _d !== void 0
                    ? _d
                    : "",
                phoneNumber:
                  (_e =
                    userDetails === null || userDetails === void 0
                      ? void 0
                      : userDetails.phoneNumber) !== null && _e !== void 0
                    ? _e
                    : "",
                proffession:
                  (_f =
                    userDetails === null || userDetails === void 0
                      ? void 0
                      : userDetails.proffession) !== null && _f !== void 0
                    ? _f
                    : "",
              },
              problem: appointment.problem,
              date: appointment.date,
              time: appointment.time,
              mode: appointment.consultationMode,
              status: appointment.appointmentStatus,
              payment: appointment.payment || "",
              fee: appointment.fee,
              paymentDate: appointment.paymentDate,
              note: appointment.notes,
              caseId: appointment.caseId,
            };
          }),
        ),
      );
      return {
        appointments: appointmentDetails,
        totalAppointments: appointments.totalAppointments,
      };
    });
  }
}
exports.GetAppointmentUseCase = GetAppointmentUseCase;
