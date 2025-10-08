import { Types } from "mongoose";
import { IPlansEntity } from "../../domain/entity/plansEntity";
import { planModel } from "../models/planModel";
import { IPlanManagementRepository } from "../repositoryInterface/IPlanManagementRepository";
import { subscribersModel } from "../../../lawyer/infrastructure/models/subscribersModel";

export class PlanManagementRepository implements IPlanManagementRepository {
  async addPlan(data: IPlansEntity): Promise<void> {
    await planModel.create(data);
  }

  async isPlanExist(name: string): Promise<IPlansEntity | null> {
    return await planModel.findOne({ name: name });
  }

  async updatePlane(planId: Types.ObjectId, data: IPlansEntity): Promise<void> {
    await planModel.findByIdAndUpdate(planId, { $set: data });
  }

  async setPlanStatus(planId: Types.ObjectId, status: string): Promise<void> {
    await planModel.findByIdAndUpdate(planId, {
      $set: { status: status == "Activate" ? true : false },
    });
  }

  async deletePlan(planId: Types.ObjectId): Promise<void> {
    await planModel.findByIdAndUpdate(planId, { $set: { isDeleted: true } });
  }

  async getPlans(): Promise<IPlansEntity[] | null> {
    return await planModel.find({ isDeleted: false });
  }

  async getActivePlans(): Promise<number> {
    return planModel.countDocuments({ status: true });
  }

  async getInActivePlans(): Promise<number> {
    return planModel.countDocuments({ status: false });
  }

  async getMostPopularPlan(): Promise<string> {
    let result = await planModel.find().sort({ price: -1 }).limit(1);
    return result[0].name;
  }

  async getMonthlyIncome(): Promise<number> {
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

    const result = await subscribersModel.aggregate([
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
  }

  async searchPlan(planName: string): Promise<IPlansEntity[] | null> {
    return await planModel.find({
      name: { $regex: new RegExp(`^${planName}$`, "i") },
    });
  }
}
