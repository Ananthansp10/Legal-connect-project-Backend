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
const appointmentModel_1 = require("../../../user/infrastructure/models/appointmentModel");
const appointmentStatus_1 = require("../../../../common/status/appointmentStatus");
const userProfileModel_1 = require("../../../user/infrastructure/models/userProfileModel");
class AppointmentRepository {
  getAppointments(lawyerId, appointmentStatus, startIndex, endIndex) {
    return __awaiter(this, void 0, void 0, function* () {
      let result;
      const totalAppointments =
        yield appointmentModel_1.appointmentModel.countDocuments({
          lawyerId: lawyerId,
          appointmentStatus: appointmentStatus,
        });
      if (appointmentStatus == appointmentStatus_1.AppointmentStatus.PENDING) {
        result = yield appointmentModel_1.appointmentModel
          .find({
            lawyerId: lawyerId,
            appointmentStatus: appointmentStatus_1.AppointmentStatus.PENDING,
          })
          .skip(startIndex)
          .limit(endIndex);
      } else if (
        appointmentStatus == appointmentStatus_1.AppointmentStatus.ACCEPTED
      ) {
        result = yield appointmentModel_1.appointmentModel
          .find({
            lawyerId: lawyerId,
            appointmentStatus: appointmentStatus_1.AppointmentStatus.ACCEPTED,
          })
          .skip(startIndex)
          .limit(endIndex);
      } else if (
        appointmentStatus == appointmentStatus_1.AppointmentStatus.BOOKED
      ) {
        result = yield appointmentModel_1.appointmentModel
          .find({
            lawyerId: lawyerId,
            appointmentStatus: appointmentStatus_1.AppointmentStatus.BOOKED,
          })
          .skip(startIndex)
          .limit(endIndex);
      } else if (
        appointmentStatus == appointmentStatus_1.AppointmentStatus.COMPLETED
      ) {
        result = yield appointmentModel_1.appointmentModel
          .find({
            lawyerId: lawyerId,
            appointmentStatus: appointmentStatus_1.AppointmentStatus.COMPLETED,
          })
          .skip(startIndex)
          .limit(endIndex);
      } else if (
        appointmentStatus == appointmentStatus_1.AppointmentStatus.CANCELLED
      ) {
        result = yield appointmentModel_1.appointmentModel
          .find({
            lawyerId: lawyerId,
            appointmentStatus: appointmentStatus_1.AppointmentStatus.CANCELLED,
          })
          .skip(startIndex)
          .limit(endIndex);
      } else {
        result = yield appointmentModel_1.appointmentModel
          .find({
            lawyerId: lawyerId,
            appointmentStatus: appointmentStatus_1.AppointmentStatus.REJECTED,
          })
          .skip(startIndex)
          .limit(endIndex);
      }
      return { appointments: result, totalAppointments: totalAppointments };
    });
  }
  findUserDetails(userId) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield userProfileModel_1.userProfileModel.findOne({
        userId: userId,
      });
    });
  }
  updateStatus(appointmentId, appointmentStatus) {
    return __awaiter(this, void 0, void 0, function* () {
      yield appointmentModel_1.appointmentModel.findByIdAndUpdate(
        appointmentId,
        {
          $set: { appointmentStatus: appointmentStatus },
        },
      );
    });
  }
  startMeet(appointmentId) {
    return __awaiter(this, void 0, void 0, function* () {
      yield appointmentModel_1.appointmentModel.findByIdAndUpdate(
        appointmentId,
        {
          $set: { meetStart: true },
        },
      );
    });
  }
  addNotes(appointmentId, note) {
    return __awaiter(this, void 0, void 0, function* () {
      yield appointmentModel_1.appointmentModel.findByIdAndUpdate(
        appointmentId,
        {
          $set: { notes: note },
        },
      );
    });
  }
  addFeedback(appointmentId, review) {
    return __awaiter(this, void 0, void 0, function* () {
      yield appointmentModel_1.appointmentModel.findByIdAndUpdate(
        appointmentId,
        {
          $set: { feedback: review.feedback, rating: review.rating },
        },
      );
    });
  }
  getConsultationHistory(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
      const result = yield appointmentModel_1.appointmentModel.aggregate([
        {
          $match: {
            caseId: caseId,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        {
          $lookup: {
            from: "lawyers",
            localField: "lawyerId",
            foreignField: "_id",
            as: "lawyerDetails",
          },
        },
        {
          $unwind: "$userDetails",
        },
        {
          $unwind: "$lawyerDetails",
        },
      ]);
      return result;
    });
  }
  searchAppointment(lawyerId, userName) {
    return __awaiter(this, void 0, void 0, function* () {
      const result = yield appointmentModel_1.appointmentModel.aggregate([
        {
          $match: {
            lawyerId: lawyerId,
          },
        },
        {
          $lookup: {
            from: "userprofiles",
            localField: "userId",
            foreignField: "userId",
            as: "userDetails",
          },
        },
        {
          $unwind: "$userDetails",
        },
        {
          $match: {
            "userDetails.name": userName,
          },
        },
      ]);
      return result;
    });
  }
}
exports.AppointmentRepository = AppointmentRepository;
