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
exports.SummaryRepository = void 0;
const appointmentModel_1 = require("../../../user/infrastructure/models/appointmentModel");
class SummaryRepository {
  getSummary(lawyerId) {
    return __awaiter(this, void 0, void 0, function* () {
      const result = yield appointmentModel_1.appointmentModel.aggregate([
        {
          $match: {
            lawyerId: lawyerId,
          },
        },
        {
          $facet: {
            totalConsultations: [{ $group: { _id: null, count: { $sum: 1 } } }],
            pendingConsultations: [
              { $match: { appointmentStatus: "Pending" } },
              { $group: { _id: null, count: { $sum: 1 } } },
            ],
            upcomingConsultations: [
              { $match: { appointmentStatus: "Booked" } },
              { $group: { _id: null, count: { $sum: 1 } } },
            ],
            completedConsultations: [
              { $match: { appointmentStatus: "Completed" } },
              { $group: { _id: null, count: { $sum: 1 } } },
            ],
            cancelledConsultations: [
              { $match: { appointmentStatus: "Cancelled" } },
              { $group: { _id: null, count: { $sum: 1 } } },
            ],
            rejectedConsultations: [
              { $match: { appointmentStatus: "Rejected" } },
              { $group: { _id: null, count: { $sum: 1 } } },
            ],
            totalRevenue: [
              {
                $match: { appointmentStatus: { $in: ["Booked", "Completed"] } },
              },
              { $group: { _id: null, revenue: { $sum: "$fee" } } },
            ],
            graphData: [
              { $match: { appointmentStatus: "Completed" } },
              {
                $group: {
                  _id: {
                    year: {
                      $year: { $dateFromString: { dateString: "$date" } },
                    },
                    month: {
                      $month: { $dateFromString: { dateString: "$date" } },
                    },
                  },
                  count: { $sum: 1 },
                  revenue: { $sum: "$fee" },
                },
              },
            ],
          },
        },
      ]);
      return result[0];
    });
  }
}
exports.SummaryRepository = SummaryRepository;
