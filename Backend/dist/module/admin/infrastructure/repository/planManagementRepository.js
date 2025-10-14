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
exports.PlanManagementRepository = void 0;
const planModel_1 = require("../models/planModel");
const subscribersModel_1 = require("../../../lawyer/infrastructure/models/subscribersModel");
class PlanManagementRepository {
  addPlan(data) {
    return __awaiter(this, void 0, void 0, function* () {
      yield planModel_1.planModel.create(data);
    });
  }
  isPlanExist(name) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield planModel_1.planModel.findOne({ name: name });
    });
  }
  updatePlane(planId, data) {
    return __awaiter(this, void 0, void 0, function* () {
      yield planModel_1.planModel.findByIdAndUpdate(planId, { $set: data });
    });
  }
  setPlanStatus(planId, status) {
    return __awaiter(this, void 0, void 0, function* () {
      yield planModel_1.planModel.findByIdAndUpdate(planId, {
        $set: { status: status == "Activate" ? true : false },
      });
    });
  }
  deletePlan(planId) {
    return __awaiter(this, void 0, void 0, function* () {
      yield planModel_1.planModel.findByIdAndUpdate(planId, {
        $set: { isDeleted: true },
      });
    });
  }
  getPlans() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield planModel_1.planModel.find({ isDeleted: false });
    });
  }
  getActivePlans() {
    return __awaiter(this, void 0, void 0, function* () {
      return planModel_1.planModel.countDocuments({ status: true });
    });
  }
  getInActivePlans() {
    return __awaiter(this, void 0, void 0, function* () {
      return planModel_1.planModel.countDocuments({ status: false });
    });
  }
  getMostPopularPlan() {
    return __awaiter(this, void 0, void 0, function* () {
      let result = yield planModel_1.planModel
        .find()
        .sort({ price: -1 })
        .limit(1);
      return result[0].name;
    });
  }
  getMonthlyIncome() {
    return __awaiter(this, void 0, void 0, function* () {
      const currentDate = new Date();
      const startOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1,
      );
      const endOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1,
      );
      const result = yield subscribersModel_1.subscribersModel.aggregate([
        { $unwind: "$plans" },
        {
          $addFields: {
            planDate: { $dateFromString: { dateString: "$plans.date" } },
          },
        },
        {
          $match: {
            planDate: { $gte: startOfMonth, $lt: endOfMonth },
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$plans.price" },
          },
        },
      ]);
      return result.length > 0 ? result[0].totalRevenue : 0;
    });
  }
  searchPlan(planName) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield planModel_1.planModel.find({
        name: { $regex: new RegExp(`^${planName}$`, "i") },
      });
    });
  }
}
exports.PlanManagementRepository = PlanManagementRepository;
