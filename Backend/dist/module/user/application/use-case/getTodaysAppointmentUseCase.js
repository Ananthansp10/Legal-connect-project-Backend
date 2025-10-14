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
exports.GetTodaysAppointmentsUseCase = void 0;
const mongoose_1 = require("mongoose");
class GetTodaysAppointmentsUseCase {
  constructor(_appointmentRepo) {
    this._appointmentRepo = _appointmentRepo;
  }
  execute(userId) {
    return __awaiter(this, void 0, void 0, function* () {
      const appointments = yield this._appointmentRepo.getTodaysAppointment(
        userId,
        new Date().toISOString().split("T")[0],
      );
      if (
        !appointments ||
        (appointments === null || appointments === void 0
          ? void 0
          : appointments.length) == 0
      ) {
        return [];
      }
      const appointmentsDetails = yield Promise.all(
        appointments === null || appointments === void 0
          ? void 0
          : appointments.map((appointment) =>
              __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d;
                const lawyerDetails =
                  yield this._appointmentRepo.findLawyerDetails(
                    appointment.lawyerId,
                  );
                return {
                  _id:
                    (_a = appointment._id) !== null && _a !== void 0
                      ? _a
                      : new mongoose_1.Types.ObjectId(""),
                  name:
                    (_b =
                      lawyerDetails === null || lawyerDetails === void 0
                        ? void 0
                        : lawyerDetails.personalInfo.name) !== null &&
                    _b !== void 0
                      ? _b
                      : "",
                  profileImage:
                    (_c =
                      lawyerDetails === null || lawyerDetails === void 0
                        ? void 0
                        : lawyerDetails.personalInfo.profileImage) !== null &&
                    _c !== void 0
                      ? _c
                      : "",
                  date: appointment.date,
                  time: appointment.time,
                  mode: appointment.consultationMode,
                  specialization:
                    (_d =
                      lawyerDetails === null || lawyerDetails === void 0
                        ? void 0
                        : lawyerDetails.proffessionalInfo.practiceAreas[0]) !==
                      null && _d !== void 0
                      ? _d
                      : "",
                };
              }),
            ),
      );
      return appointmentsDetails;
    });
  }
}
exports.GetTodaysAppointmentsUseCase = GetTodaysAppointmentsUseCase;
