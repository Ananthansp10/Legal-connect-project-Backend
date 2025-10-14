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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchAppointmentUseCase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class SearchAppointmentUseCase {
  constructor(_appointmentRepo) {
    this._appointmentRepo = _appointmentRepo;
  }
  execute(lawyerId, userName) {
    return __awaiter(this, void 0, void 0, function* () {
      const appointments = yield this._appointmentRepo.searchAppointment(
        lawyerId,
        userName,
      );
      if (!appointments || appointments.length == 0) {
        return null;
      }
      let result = yield Promise.all(
        appointments.map((appointment) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
          return {
            id: appointment._id,
            problem: appointment.problem,
            date: appointment.date,
            time: appointment.time,
            status: appointment.appointmentStatus,
            mode: appointment.consultationMode,
            payment:
              (_a = appointment.payment) !== null && _a !== void 0 ? _a : "",
            paymentDate: appointment.paymentDate,
            notes: appointment.notes,
            fee: appointment.fee,
            user: {
              _id:
                (_c =
                  (_b = appointment.userDetails) === null || _b === void 0
                    ? void 0
                    : _b.userId) !== null && _c !== void 0
                  ? _c
                  : new mongoose_1.default.Types.ObjectId(""),
              name:
                (_e =
                  (_d = appointment.userDetails) === null || _d === void 0
                    ? void 0
                    : _d.name) !== null && _e !== void 0
                  ? _e
                  : "",
              profileImage:
                (_g =
                  (_f = appointment.userDetails) === null || _f === void 0
                    ? void 0
                    : _f.profileImage) !== null && _g !== void 0
                  ? _g
                  : "",
              email:
                (_j =
                  (_h = appointment.userDetails) === null || _h === void 0
                    ? void 0
                    : _h.email) !== null && _j !== void 0
                  ? _j
                  : "",
              phoneNumber:
                (_l =
                  (_k = appointment.userDetails) === null || _k === void 0
                    ? void 0
                    : _k.phoneNumber) !== null && _l !== void 0
                  ? _l
                  : "",
              proffession:
                (_o =
                  (_m = appointment.userDetails) === null || _m === void 0
                    ? void 0
                    : _m.proffession) !== null && _o !== void 0
                  ? _o
                  : "",
            },
            caseId: appointment.caseId,
          };
        }),
      );
      return result;
    });
  }
}
exports.SearchAppointmentUseCase = SearchAppointmentUseCase;
