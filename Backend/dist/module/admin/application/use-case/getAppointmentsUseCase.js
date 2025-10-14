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
exports.GetAppointmentsUseCase = void 0;
class GetAppointmentsUseCase {
  constructor(_appointmentRepo) {
    this._appointmentRepo = _appointmentRepo;
  }
  execute(appointmentStatus, startIndex, limit) {
    return __awaiter(this, void 0, void 0, function* () {
      var _a;
      const appointments = yield this._appointmentRepo.findAppointments(
        appointmentStatus,
        startIndex,
        limit,
      );
      if (
        !(appointments === null || appointments === void 0
          ? void 0
          : appointments.appointments) ||
        appointments.appointments.length == 0
      ) {
        return [];
      }
      let appointmentsDetails = yield Promise.all(
        (_a = appointments.appointments) === null || _a === void 0
          ? void 0
          : _a.map((appointment) =>
              __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d, _e;
                const userDetails = yield this._appointmentRepo.findUserDetails(
                  appointment.userId,
                );
                const lawyerDetails =
                  yield this._appointmentRepo.findLawyerDetails(
                    appointment.lawyerId,
                  );
                return {
                  userName:
                    (_a =
                      userDetails === null || userDetails === void 0
                        ? void 0
                        : userDetails.name) !== null && _a !== void 0
                      ? _a
                      : "",
                  lawyerName:
                    (_b =
                      lawyerDetails === null || lawyerDetails === void 0
                        ? void 0
                        : lawyerDetails.personalInfo.name) !== null &&
                    _b !== void 0
                      ? _b
                      : "",
                  problem: appointment.problem,
                  specialization:
                    (_c =
                      lawyerDetails === null || lawyerDetails === void 0
                        ? void 0
                        : lawyerDetails.proffessionalInfo.practiceAreas[0]) !==
                      null && _c !== void 0
                      ? _c
                      : "",
                  date: appointment.date,
                  time: appointment.time,
                  appointmentStatus: appointment.appointmentStatus,
                  userProfileImage:
                    (_d =
                      userDetails === null || userDetails === void 0
                        ? void 0
                        : userDetails.profileImage) !== null && _d !== void 0
                      ? _d
                      : "",
                  lawyerProfileImage:
                    (_e =
                      lawyerDetails === null || lawyerDetails === void 0
                        ? void 0
                        : lawyerDetails.personalInfo.profileImage) !== null &&
                    _e !== void 0
                      ? _e
                      : "",
                  note: appointment.notes,
                  feedback: appointment.feedback,
                  rating: appointment.rating,
                };
              }),
            ),
      );
      return {
        appointments: appointmentsDetails || [],
        totalAppointments: appointments.totalAppointments,
      };
    });
  }
}
exports.GetAppointmentsUseCase = GetAppointmentsUseCase;
