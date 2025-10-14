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
  constructor(_appointmentRepository) {
    this._appointmentRepository = _appointmentRepository;
  }
  execute(userId, appointmentStatus, startIndex, limit) {
    return __awaiter(this, void 0, void 0, function* () {
      const appointments =
        yield this._appointmentRepository.findAppointmentByUserId(
          userId,
          appointmentStatus,
          startIndex,
          limit,
        );
      if (!appointments || appointments.appointments.length == 0) return null;
      const appointmentDetails = yield Promise.all(
        appointments.appointments.map((appointment) =>
          __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            const lawyerDetails =
              yield this._appointmentRepository.findLawyerDetails(
                appointment.lawyerId,
              );
            const lawyerData = {
              _id:
                (_a =
                  lawyerDetails === null || lawyerDetails === void 0
                    ? void 0
                    : lawyerDetails.lawyerId) !== null && _a !== void 0
                  ? _a
                  : new mongoose_1.Types.ObjectId(""),
              name:
                (_b =
                  lawyerDetails === null || lawyerDetails === void 0
                    ? void 0
                    : lawyerDetails.personalInfo.name) !== null && _b !== void 0
                  ? _b
                  : "",
              specialization:
                (_c =
                  lawyerDetails === null || lawyerDetails === void 0
                    ? void 0
                    : lawyerDetails.proffessionalInfo.practiceAreas) !== null &&
                _c !== void 0
                  ? _c
                  : [],
              profileImage:
                (_d =
                  lawyerDetails === null || lawyerDetails === void 0
                    ? void 0
                    : lawyerDetails.personalInfo.profileImage) !== null &&
                _d !== void 0
                  ? _d
                  : "",
              fee:
                (_e =
                  lawyerDetails === null || lawyerDetails === void 0
                    ? void 0
                    : lawyerDetails.proffessionalInfo.fee) !== null &&
                _e !== void 0
                  ? _e
                  : "",
            };
            return {
              _id:
                (_f = appointment._id) !== null && _f !== void 0
                  ? _f
                  : new mongoose_1.Types.ObjectId(""),
              lawyer:
                lawyerData !== null && lawyerData !== void 0
                  ? lawyerData
                  : new mongoose_1.Types.ObjectId(""),
              date: appointment.date,
              time: appointment.time,
              mode: appointment.consultationMode,
              status: appointment.appointmentStatus,
              payment: (
                appointment === null || appointment === void 0
                  ? void 0
                  : appointment.payment
              )
                ? appointment.payment
                : "",
              problem: appointment.problem,
              fee: appointment.fee,
              paymentDate: appointment.paymentDate,
              meetStart: appointment.meetStart,
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
