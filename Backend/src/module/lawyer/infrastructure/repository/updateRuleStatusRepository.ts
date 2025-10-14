import { Types } from "mongoose";
import { IUpdateRuleStatusRepository } from "../repositoryInterface/IUpdateRuleStatusRepository";
import { availableSlotModel } from "../models/slotAvailablityModel";

export class UpdateRuleStatusRepository implements IUpdateRuleStatusRepository {
  async updateRuleStatus(ruleId: Types.ObjectId): Promise<void> {
    await availableSlotModel.findByIdAndUpdate(ruleId, [
      { $set: { status: { $not: "$status" } } },
    ]);
  }
}
