import { Types } from "mongoose";
import { IUpdateRuleStatusRepository } from "../../infrastructure/repositoryInterface/IUpdateRuleStatusRepository";
import { IUpdateRuleStatusUseCase } from "../use-case-interface/IUpdateRuleStatusUseCase";

export class UpdateRuleStatusUseCase implements IUpdateRuleStatusUseCase {
  constructor(private _updateRuleStatusRepo: IUpdateRuleStatusRepository) {}

  async execute(ruleId: Types.ObjectId, ruleStatus: string): Promise<string> {
    await this._updateRuleStatusRepo.updateRuleStatus(
      ruleId,
      Boolean(ruleStatus),
    );
    return ruleStatus;
  }
}
