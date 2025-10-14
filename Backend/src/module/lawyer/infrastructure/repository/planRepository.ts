import { Types } from "mongoose";
import {
  ISubscribersEntity,
  IPlanDetail,
} from "../../domain/entity/subscribersEntity";
import { IPlanRepository } from "../repositoryInterface/IPlanRepository";
import { subscribersModel } from "../models/subscribersModel";
import { IPlansEntity } from "../../../admin/domain/entity/plansEntity";
import { planModel } from "../../../admin/infrastructure/models/planModel";
import { IPlanDetailsDto } from "../../domain/dtos/planDetailsDto";

export class PlanRepository implements IPlanRepository {
  async findPlan(lawyerId: Types.ObjectId): Promise<ISubscribersEntity | null> {
    return await subscribersModel.findOne({ lawyerId: lawyerId });
  }

  async addPlan(data: ISubscribersEntity): Promise<void> {
    await subscribersModel.create(data);
  }

  async updatePlan(lawyerId: Types.ObjectId, plan: IPlanDetail): Promise<void> {
    await subscribersModel.findOneAndUpdate(
      { lawyerId: lawyerId },
      { $push: { plans: plan } },
    );
  }

  async getPlanDetails(planId: Types.ObjectId): Promise<IPlansEntity | null> {
    return await planModel.findById(planId);
  }

  async activatePlan(date: string): Promise<void> {
    await subscribersModel.updateMany(
      { "plans.activationDate": { $lte: date } },
      { $set: { "plans.$[elem].isActive": true } },
      { arrayFilters: [{ "elem.activationDate": { $lte: date } }] },
    );
  }

  async expirePlan(date: string): Promise<void> {
    await subscribersModel.updateMany(
      { "plans.expireDate": { $lte: date } },
      { $set: { "plans.$[elem].isActive": false } },
      { arrayFilters: [{ "elem.expiryDate": { $lte: date } }] },
    );
    await subscribersModel.updateMany(
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
  }

  async updatePlanAppointment(
    lawyerId: Types.ObjectId,
    planId: Types.ObjectId,
  ): Promise<void> {
    await subscribersModel.updateOne(
      { lawyerId: lawyerId },
      { $inc: { "plans.$[elem].appointmentsCount": 1 } },
      { arrayFilters: [{ "elem.planId": planId }] },
    );
  }

  async findStarterPlan(
    lawyerId: Types.ObjectId,
  ): Promise<IPlanDetailsDto[] | null> {
    return await subscribersModel.aggregate([
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
  }
}
