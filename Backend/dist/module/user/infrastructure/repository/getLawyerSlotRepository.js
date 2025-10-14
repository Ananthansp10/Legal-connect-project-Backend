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
exports.GetLawyerSlotRepository = void 0;
const slotAvailablityModel_1 = require("../../../lawyer/infrastructure/models/slotAvailablityModel");
const appointmentModel_1 = require("../models/appointmentModel");
const appointmentStatus_1 = require("../../../../common/status/appointmentStatus");
class GetLawyerSlotRepository {
  findSlot(lawyerId, date) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield slotAvailablityModel_1.availableSlotModel.find({
        lawyerId: lawyerId,
        status: true,
        startDate: { $lte: date },
        endDate: { $gte: date },
      });
    });
  }
  findAppointmentSlot(lawyerId, date, time) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield appointmentModel_1.appointmentModel.findOne({
        lawyerId: lawyerId,
        date: date,
        time: time,
        appointmentStatus: {
          $nin: [
            appointmentStatus_1.AppointmentStatus.CANCELLED,
            appointmentStatus_1.AppointmentStatus.REJECTED,
          ],
        },
      });
    });
  }
}
exports.GetLawyerSlotRepository = GetLawyerSlotRepository;
