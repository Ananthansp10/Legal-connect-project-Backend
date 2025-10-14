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
const lawyerProfileModel_1 = require("../../../lawyer/infrastructure/models/lawyerProfileModel");
const appointmentModel_1 = require("../../../user/infrastructure/models/appointmentModel");
const userProfileModel_1 = require("../../../user/infrastructure/models/userProfileModel");
class AppointmentRepository {
  findAppointments(appointmentStatus, startIndex, limit) {
    return __awaiter(this, void 0, void 0, function* () {
      let appointments = yield appointmentModel_1.appointmentModel
        .find(
          appointmentStatus != "All"
            ? { appointmentStatus: appointmentStatus }
            : {},
        )
        .skip(startIndex)
        .limit(limit);
      let totalAppointments =
        yield appointmentModel_1.appointmentModel.countDocuments(
          appointmentStatus != "All"
            ? { appointmentStatus: appointmentStatus }
            : {},
        );
      return { appointments, totalAppointments };
    });
  }
  findUserDetails(userId) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield userProfileModel_1.userProfileModel.findOne({
        userId: userId,
      });
    });
  }
  findLawyerDetails(lawyerId) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield lawyerProfileModel_1.lawyerProfileModel.findOne({
        lawyerId: lawyerId,
      });
    });
  }
  searchAppointment(name) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield appointmentModel_1.appointmentModel.aggregate([
        {
          $lookup: {
            from: "userprofiles",
            localField: "userId",
            foreignField: "userId",
            as: "userDetails",
          },
        },
        {
          $lookup: {
            from: "lawyerprofiles",
            localField: "lawyerId",
            foreignField: "lawyerId",
            as: "lawyerDetails",
          },
        },
        {
          $unwind: "$userDetails",
        },
        {
          $unwind: "$lawyerDetails",
        },
        {
          $match: {
            "userDetails.name": name,
          },
        },
      ]);
    });
  }
}
exports.AppointmentRepository = AppointmentRepository;
