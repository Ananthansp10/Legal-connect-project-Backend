import { Types } from "mongoose";
import {
  ISubscribersEntity,
  PlanDetail,
} from "../../domain/entity/subscribersEntity";
import { IPlanRepository } from "../repositoryInterface/IPlanRepository";
import { subscribersModel } from "../models/subscribersModel";

export class PlanRepository implements IPlanRepository {
  async findPlan(lawyerId: Types.ObjectId): Promise<ISubscribersEntity | null> {
    return await subscribersModel.findOne({ lawyerId: lawyerId });
  }

  async addPlan(data: ISubscribersEntity): Promise<void> {
    await subscribersModel.create(data);
  }

  async updatePlan(lawyerId: Types.ObjectId, plan: PlanDetail): Promise<void> {
    await subscribersModel.findOneAndUpdate(
      { lawyerId: lawyerId },
      { $push: { plans: plan } },
    );
  }
}
