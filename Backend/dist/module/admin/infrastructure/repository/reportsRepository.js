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
exports.ReportsRepository = void 0;
const userSignupModel_1 = require("../../../auth/userAuth/infrastructure/models/userSignupModel");
const lawyerProfileModel_1 = require("../../../lawyer/infrastructure/models/lawyerProfileModel");
const subscribersModel_1 = require("../../../lawyer/infrastructure/models/subscribersModel");
const appointmentModel_1 = require("../../../user/infrastructure/models/appointmentModel");
const userProfileModel_1 = require("../../../user/infrastructure/models/userProfileModel");
class ReportsRepository {
  getTotalRevenue() {
    return __awaiter(this, void 0, void 0, function* () {
      const result = yield subscribersModel_1.subscribersModel.aggregate([
        {
          $unwind: "$plans",
        },
        {
          $group: { _id: null, totalRevenue: { $sum: "$plans.price" } },
        },
      ]);
      return result.length > 0 ? result[0].totalRevenue : 0;
    });
  }
  getTotalAppointments() {
    return __awaiter(this, void 0, void 0, function* () {
      return (yield appointmentModel_1.appointmentModel.find()).length;
    });
  }
  getTotalUsers() {
    return __awaiter(this, void 0, void 0, function* () {
      return (yield userSignupModel_1.userModel.find()).length;
    });
  }
  getTotalSubscribedLawyers() {
    return __awaiter(this, void 0, void 0, function* () {
      return (yield subscribersModel_1.subscribersModel.find()).length;
    });
  }
  getSubscriptionPlanReport() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield subscribersModel_1.subscribersModel.aggregate([
        {
          $unwind: "$plans",
        },
        {
          $lookup: {
            from: "plans",
            localField: "plans.planId",
            foreignField: "_id",
            as: "planDetails",
          },
        },
        {
          $group: {
            _id: "$planDetails.name",
            specializationCount: { $sum: 1 },
          },
        },
      ]);
    });
  }
  getStateReport() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield userProfileModel_1.userProfileModel.aggregate([
        {
          $group: { _id: "$address.state", usersCount: { $sum: 1 } },
        },
      ]);
    });
  }
  getLawyerDetails() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield subscribersModel_1.subscribersModel.aggregate([
        {
          $lookup: {
            from: "lawyers",
            localField: "lawyerId",
            foreignField: "_id",
            as: "lawyerDetails",
          },
        },
        {
          $lookup: {
            from: "lawyerprofiles",
            localField: "lawyerId",
            foreignField: "lawyerId",
            as: "lawyerProfile",
          },
        },
        {
          $unwind: "$plans",
        },
        {
          $lookup: {
            from: "plans",
            localField: "plans.planId",
            foreignField: "_id",
            as: "planDetails",
          },
        },
        {
          $lookup: {
            from: "appointments",
            localField: "lawyerId",
            foreignField: "lawyerId",
            as: "appointments",
          },
        },
        {
          $addFields: {
            appointmentsCount: { $size: "$appointments" },
          },
        },
        {
          $group: {
            _id: "$lawyerId",
            totalRevenue: { $sum: "$plans.price" },
            totalAppointments: { $sum: "$appointmentsCount" },
            lawyerDetails: { $first: "$lawyerDetails" },
            lawyerProfile: { $first: "$lawyerProfile" },
            planNames: { $addToSet: "$planDetails.name" },
          },
        },
        {
          $project: {
            name: { $arrayElemAt: ["$lawyerDetails.name", 0] },
            specialization: {
              $arrayElemAt: [
                "$lawyerProfile.proffessionalInfo.practiceAreas",
                0,
              ],
            },
            totalRevenue: 1,
            totalAppointments: 1,
            planName: "$planNames",
            joinDate: { $arrayElemAt: ["$lawyerDetails.createdAt", 0] },
          },
        },
      ]);
    });
  }
  getRevenueDateChart(dateRange) {
    return __awaiter(this, void 0, void 0, function* () {
      let result = [];
      if (dateRange == "Daily") {
        result = yield subscribersModel_1.subscribersModel.aggregate([
          { $unwind: "$plans" },
          {
            $addFields: {
              planDate: {
                $cond: [
                  { $eq: [{ $type: "$plans.date" }, "string"] },
                  {
                    $dateFromString: {
                      dateString: "$plans.date",
                      format: "%Y-%m-%d",
                    },
                  },
                  "$plans.date",
                ],
              },
            },
          },
          {
            $group: {
              _id: {
                day: { $dayOfMonth: "$planDate" },
                month: { $month: "$planDate" },
                year: { $year: "$planDate" },
              },
              totalRevenue: { $sum: "$plans.price" },
            },
          },
        ]);
      }
      if (dateRange == "Weekly") {
        result = yield subscribersModel_1.subscribersModel.aggregate([
          { $unwind: "$plans" },
          {
            $group: {
              _id: {
                year: { $year: { $toDate: "$plans.date" } },
                week: { $week: { $toDate: "$plans.date" } },
              },
              totalRevenue: { $sum: "$plans.price" },
            },
          },
          { $sort: { "_id.year": 1, "_id.week": 1 } },
        ]);
      }
      if (dateRange == "Monthly") {
        result = yield subscribersModel_1.subscribersModel.aggregate([
          { $unwind: "$plans" },
          {
            $addFields: {
              planDate: { $toDate: "$plans.date" },
            },
          },
          {
            $group: {
              _id: {
                month: { $month: "$planDate" },
                year: { $year: "$planDate" },
              },
              totalRevenue: { $sum: "$plans.price" },
            },
          },
          { $sort: { "_id.year": 1, "_id.month": 1 } },
          {
            $project: {
              _id: 0,
              month: {
                $let: {
                  vars: {
                    months: [
                      "",
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ],
                  },
                  in: { $arrayElemAt: ["$$months", "$_id.month"] },
                },
              },
              year: "$_id.year",
              totalRevenue: 1,
            },
          },
        ]);
      }
      if (dateRange == "Yearly") {
        result = yield subscribersModel_1.subscribersModel.aggregate([
          { $unwind: "$plans" },
          {
            $addFields: {
              planDate: { $toDate: "$plans.date" },
            },
          },
          {
            $group: {
              _id: { year: { $year: "$planDate" } },
              totalRevenue: { $sum: "$plans.price" },
            },
          },
          { $sort: { "_id.year": 1 } },
          {
            $project: {
              _id: 0,
              year: "$_id.year",
              totalRevenue: 1,
            },
          },
        ]);
      }
      if (dateRange == "All") {
        result = yield subscribersModel_1.subscribersModel.aggregate([
          { $unwind: "$plans" },
          {
            $group: {
              _id: null,
              totalRevenue: { $sum: "$plans.price" },
            },
          },
          {
            $project: {
              _id: 0,
              totalRevenue: 1,
            },
          },
        ]);
      }
      return result;
    });
  }
  getSpecializationChart(specializationType) {
    return __awaiter(this, void 0, void 0, function* () {
      let result = [];
      if (specializationType == "All") {
        result = yield lawyerProfileModel_1.lawyerProfileModel.aggregate([
          {
            $unwind: "$proffessionalInfo.practiceAreas",
          },
          {
            $group: {
              _id: "$proffessionalInfo.practiceAreas",
              specializationCount: { $sum: 1 },
            },
          },
        ]);
      } else {
        result = yield lawyerProfileModel_1.lawyerProfileModel.aggregate([
          {
            $unwind: "$proffessionalInfo.practiceAreas",
          },
          {
            $match: {
              "proffessionalInfo.practiceAreas": specializationType,
            },
          },
          {
            $group: {
              _id: "$proffessionalInfo.practiceAreas",
              specializationCount: { $sum: 1 },
            },
          },
        ]);
      }
      return result;
    });
  }
}
exports.ReportsRepository = ReportsRepository;
