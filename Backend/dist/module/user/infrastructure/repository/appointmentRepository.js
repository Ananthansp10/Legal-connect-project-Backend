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
exports.AppointmentRepository = void 0;
const appointmentModel_1 = require("../models/appointmentModel");
const lawyerProfileModel_1 = require("../../../lawyer/infrastructure/models/lawyerProfileModel");
const appointmentStatus_1 = require("../../../../common/status/appointmentStatus");
const paymentStatus_1 = require("../../../../common/status/paymentStatus");
class AppointmentRepository {
  findAppointmentByUserId(userId, appointmentStatus, startIndex, limit) {
    return __awaiter(this, void 0, void 0, function* () {
      let result;
      const totalAppointments =
        yield appointmentModel_1.appointmentModel.countDocuments({
          userId: userId,
          appointmentStatus:
            appointmentStatus == "Upcoming" ? "Booked" : appointmentStatus,
        });
      if (appointmentStatus == appointmentStatus_1.AppointmentStatus.PENDING) {
        result = yield appointmentModel_1.appointmentModel
          .find({
            userId: userId,
            appointmentStatus: appointmentStatus_1.AppointmentStatus.PENDING,
          })
          .skip(startIndex)
          .limit(limit);
      } else if (
        appointmentStatus == appointmentStatus_1.AppointmentStatus.ACCEPTED
      ) {
        result = yield appointmentModel_1.appointmentModel
          .find({
            userId: userId,
            appointmentStatus: appointmentStatus_1.AppointmentStatus.ACCEPTED,
          })
          .skip(startIndex)
          .limit(limit);
      } else if (
        appointmentStatus == appointmentStatus_1.AppointmentStatus.COMPLETED
      ) {
        result = yield appointmentModel_1.appointmentModel
          .find({
            userId: userId,
            appointmentStatus: appointmentStatus_1.AppointmentStatus.COMPLETED,
          })
          .skip(startIndex)
          .limit(limit);
      } else if (
        appointmentStatus == appointmentStatus_1.AppointmentStatus.CANCELLED
      ) {
        result = yield appointmentModel_1.appointmentModel
          .find({
            userId: userId,
            appointmentStatus: appointmentStatus_1.AppointmentStatus.CANCELLED,
          })
          .skip(startIndex)
          .limit(limit);
      } else if (
        appointmentStatus == appointmentStatus_1.AppointmentStatus.REJECTED
      ) {
        result = yield appointmentModel_1.appointmentModel
          .find({
            userId: userId,
            appointmentStatus: appointmentStatus_1.AppointmentStatus.REJECTED,
          })
          .skip(startIndex)
          .limit(limit);
      } else if (
        appointmentStatus == appointmentStatus_1.AppointmentStatus.UPCOMING
      ) {
        result = yield appointmentModel_1.appointmentModel
          .find({
            userId: userId,
            appointmentStatus: appointmentStatus_1.AppointmentStatus.BOOKED,
          })
          .skip(startIndex)
          .limit(limit);
      }
      return result
        ? { appointments: result, totalAppointments: totalAppointments }
        : null;
    });
  }
  findLawyerDetails(lawyerId) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield lawyerProfileModel_1.lawyerProfileModel.findOne({
        lawyerId: lawyerId,
      });
    });
  }
  updatePayment(appointmentId, status, paymentId) {
    return __awaiter(this, void 0, void 0, function* () {
      let currentDate = new Date().toISOString().split("T")[0];
      yield appointmentModel_1.appointmentModel.findByIdAndUpdate(
        appointmentId,
        {
          $set: {
            paymentDate: currentDate,
            payment: status,
            appointmentStatus:
              status == paymentStatus_1.PaymentStatus.SUCCESS
                ? appointmentStatus_1.AppointmentStatus.BOOKED
                : appointmentStatus_1.AppointmentStatus.ACCEPTED,
            paymentId: paymentId,
          },
        },
      );
    });
  }
  cancelAppointment(appointmentId) {
    return __awaiter(this, void 0, void 0, function* () {
      yield appointmentModel_1.appointmentModel.findByIdAndUpdate(
        appointmentId,
        {
          $set: {
            appointmentStatus: appointmentStatus_1.AppointmentStatus.CANCELLED,
          },
        },
      );
    });
  }
  findAppointmentById(appointmentId) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield appointmentModel_1.appointmentModel.findById(appointmentId);
    });
  }
  getTodaysAppointment(userId, date) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield appointmentModel_1.appointmentModel.find({
        userId,
        date: date,
        appointmentStatus: appointmentStatus_1.AppointmentStatus.BOOKED,
      });
    });
  }
  resheduleAppointment(appointmentId) {
    return __awaiter(this, void 0, void 0, function* () {
      yield appointmentModel_1.appointmentModel.findByIdAndDelete(
        appointmentId,
      );
    });
  }
  refundPayment(appointmentId, status) {
    return __awaiter(this, void 0, void 0, function* () {
      yield appointmentModel_1.appointmentModel.findByIdAndUpdate(
        appointmentId,
        {
          $set: { refundStatus: status },
        },
      );
    });
  }
}
exports.AppointmentRepository = AppointmentRepository;
