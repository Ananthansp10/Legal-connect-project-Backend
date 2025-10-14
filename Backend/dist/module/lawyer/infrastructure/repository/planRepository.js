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
exports.PlanRepository = void 0;
const subscribersModel_1 = require("../models/subscribersModel");
const planModel_1 = require("../../../admin/infrastructure/models/planModel");
class PlanRepository {
  findPlan(lawyerId) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield subscribersModel_1.subscribersModel.findOne({
        lawyerId: lawyerId,
      });
    });
  }
  addPlan(data) {
    return __awaiter(this, void 0, void 0, function* () {
      yield subscribersModel_1.subscribersModel.create(data);
    });
  }
  updatePlan(lawyerId, plan) {
    return __awaiter(this, void 0, void 0, function* () {
      yield subscribersModel_1.subscribersModel.findOneAndUpdate(
        { lawyerId: lawyerId },
        { $push: { plans: plan } },
      );
    });
  }
  getPlanDetails(planId) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield planModel_1.planModel.findById(planId);
    });
  }
  activatePlan(date) {
    return __awaiter(this, void 0, void 0, function* () {
      yield subscribersModel_1.subscribersModel.updateMany(
        { "plans.activationDate": { $lte: date } },
        { $set: { "plans.$[elem].isActive": true } },
        { arrayFilters: [{ "elem.activationDate": { $lte: date } }] },
      );
    });
  }
  expirePlan(date) {
    return __awaiter(this, void 0, void 0, function* () {
      yield subscribersModel_1.subscribersModel.updateMany(
        { "plans.expireDate": { $lte: date } },
        { $set: { "plans.$[elem].isActive": false } },
        { arrayFilters: [{ "elem.expiryDate": { $lte: date } }] },
      );
      yield subscribersModel_1.subscribersModel.updateMany(
        {},
        { $set: { "plans.$[elem].isActive": false } },
        {
          arrayFilters: [
            {
              $expr: {
                $eq: ["$elem.totalAppointments", "$elem.appointmentsCount"],
              },
            },
          ],
        },
      );
    });
  }
  updatePlanAppointment(lawyerId, planId) {
    return __awaiter(this, void 0, void 0, function* () {
      yield subscribersModel_1.subscribersModel.updateOne(
        { lawyerId: lawyerId },
        { $inc: { "plans.$[elem].appointmentsCount": 1 } },
        { arrayFilters: [{ "elem.planId": planId }] },
      );
    });
  }
  findStarterPlan(lawyerId) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield subscribersModel_1.subscribersModel.aggregate([
        {
          $match: {
            lawyerId: lawyerId,
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
          $unwind: "$planDetails",
        },
      ]);
    });
  }
}
exports.PlanRepository = PlanRepository;
