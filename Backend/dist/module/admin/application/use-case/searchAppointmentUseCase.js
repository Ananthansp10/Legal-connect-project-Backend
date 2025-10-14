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
exports.SearchAppointmentUseCase = void 0;
class SearchAppointmentUseCase {
  constructor(_appointmentRepo) {
    this._appointmentRepo = _appointmentRepo;
  }
  execute(name) {
    return __awaiter(this, void 0, void 0, function* () {
      let appointments = yield this._appointmentRepo.searchAppointment(name);
      let result;
      if (!appointments || appointments.length == 0) {
        return [];
      } else {
        result = yield Promise.all(
          appointments.map((appointment) => {
            var _a;
            return {
              userName: appointment.userDetails.name,
              lawyerName: appointment.lawyerDetails.personalInfo.name,
              userProfileImage: appointment.userDetails.profileImage,
              lawyerProfileImage:
                appointment.lawyerDetails.personalInfo.profileImage,
              specialization:
                (_a =
                  appointment.lawyerDetails.proffessionalInfo
                    .specialization) === null || _a === void 0
                  ? void 0
                  : _a[0],
              date: appointment.date,
              time: appointment.time,
              appointmentStatus: appointment.appointmentStatus,
              problem: appointment.problem,
            };
          }),
        );
      }
      return result;
    });
  }
}
exports.SearchAppointmentUseCase = SearchAppointmentUseCase;
