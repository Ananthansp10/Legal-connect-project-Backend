import mongoose from "mongoose";
import { IUpdateRuleStatusRepository } from "../../infrastructure/repositoryInterface/IUpdateRuleStatusRepository";
import { IUpdateRuleStatusUseCase } from "../use-case-interface/IUpdateRuleStatusUseCase";

export class UpdateRuleStatusUseCase implements IUpdateRuleStatusUseCase {
  constructor(private _updateRuleStatusRepo: IUpdateRuleStatusRepository) {}

  async execute(ruleId: string, ruleStatus: string): Promise<string> {
    await this._updateRuleStatusRepo.updateRuleStatus(
      new mongoose.Types.ObjectId(ruleId),
      Boolean(ruleStatus),
    );
    return ruleStatus;
  }
}
