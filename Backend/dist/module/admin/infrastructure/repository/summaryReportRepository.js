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
exports.SummaryReportRepository = void 0;
const lawyerModel_1 = require("../../../auth/lawyerAuth/infrastructure/models/lawyerModel");
const userSignupModel_1 = require("../../../auth/userAuth/infrastructure/models/userSignupModel");
const appointmentModel_1 = require("../../../user/infrastructure/models/appointmentModel");
const lawyerProfileModel_1 = require("../../../lawyer/infrastructure/models/lawyerProfileModel");
const reviewsModel_1 = require("../../../user/infrastructure/models/reviewsModel");
const userProfileModel_1 = require("../../../user/infrastructure/models/userProfileModel");
const subscribersModel_1 = require("../../../lawyer/infrastructure/models/subscribersModel");
class SummaryReportRepository {
  getTotalUsers() {
    return __awaiter(this, void 0, void 0, function* () {
      return (yield userSignupModel_1.userModel.find()).length;
    });
  }
  getTotalLawyers() {
    return __awaiter(this, void 0, void 0, function* () {
      return (yield lawyerModel_1.lawyerModel.find()).length;
    });
  }
  getTodaysAppointments() {
    return __awaiter(this, void 0, void 0, function* () {
      const currentDate = new Date().toISOString().split("T")[0];
      return (yield appointmentModel_1.appointmentModel.find({
        date: currentDate,
      })).length;
    });
  }
  getTotalUnverifiedLawyers() {
    return __awaiter(this, void 0, void 0, function* () {
      return (yield lawyerModel_1.lawyerModel.find({ verified: false })).length;
    });
  }
  getRevenueChart() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield subscribersModel_1.subscribersModel.aggregate([
        {
          $unwind: "$plans",
        },
        {
          $group: {
            _id: {
              month: {
                $month: { $dateFromString: { dateString: "$plans.date" } },
              },
              year: {
                $year: { $dateFromString: { dateString: "$plans.date" } },
              },
            },
            revenue: { $sum: "$plans.price" },
          },
        },
      ]);
    });
  }
  getWeeklyAppointments() {
    return __awaiter(this, void 0, void 0, function* () {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);
      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(endOfMonth.getMonth() + 1);
      endOfMonth.setHours(0, 0, 0, 0);
      const startDateISO = startOfMonth.toISOString();
      const endDateISO = endOfMonth.toISOString();
      return yield appointmentModel_1.appointmentModel.aggregate([
        {
          $match: {
            appointmentStatus: "Booked",
            date: { $gte: startDateISO, $lt: endDateISO },
          },
        },
        {
          $addFields: {
            parsedDate: {
              $dateFromString: {
                dateString: "$date",
                format: "%Y-%m-%d",
              },
            },
          },
        },
        {
          $addFields: {
            weekStart: {
              $dateSubtract: {
                startDate: "$parsedDate",
                unit: "day",
                amount: { $subtract: [{ $dayOfWeek: "$parsedDate" }, 1] },
              },
            },
          },
        },
        {
          $group: {
            _id: { dayOfWeek: { $dayOfWeek: "$parsedDate" } },
            appointmentsCount: { $sum: 1 },
          },
        },
        {
          $addFields: {
            dayName: {
              $arrayElemAt: [
                ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                { $subtract: ["$_id.dayOfWeek", 1] },
              ],
            },
          },
        },
      ]);
    });
  }
  getSpecializationChart() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield lawyerModel_1.lawyerModel.aggregate([
        {
          $facet: {
            totalLawyers: [{ $count: "totalLawyers" }],
            specializations: [
              { $unwind: "$specialization" },
              { $group: { _id: "$specialization", count: { $sum: 1 } } },
            ],
          },
        },
      ]);
    });
  }
  getLawyerProfile(lawyerId) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield lawyerProfileModel_1.lawyerProfileModel.findOne({
        lawyerId: lawyerId,
      });
    });
  }
  getLawyerApppointments(lawyerId) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield appointmentModel_1.appointmentModel.find({
        lawyerId: lawyerId,
      });
    });
  }
  getLawyers() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield lawyerModel_1.lawyerModel.find();
    });
  }
  getLawyerRating(lawyerId) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield reviewsModel_1.reviewsModel.findOne({ lawyerId: lawyerId });
    });
  }
  getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield userSignupModel_1.userModel.find();
    });
  }
  getUserProfile(userId) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield userProfileModel_1.userProfileModel.findOne({
        userId: userId,
      });
    });
  }
  getUserAppointments(userId) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield appointmentModel_1.appointmentModel.find({ userId: userId });
    });
  }
  getStateChart() {
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
          $unwind: "$userDetails",
        },
        {
          $unwind: "$userDetails.address",
        },
        {
          $group: {
            _id: "$userDetails.address.state",
            consultations: { $sum: 1 },
          },
        },
      ]);
    });
  }
  getCountryChart() {
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
          $unwind: "$userDetails",
        },
        {
          $group: {
            _id: "$userDetails.address.country",
            consultations: { $sum: 1 },
          },
        },
      ]);
    });
  }
}
exports.SummaryReportRepository = SummaryReportRepository;
