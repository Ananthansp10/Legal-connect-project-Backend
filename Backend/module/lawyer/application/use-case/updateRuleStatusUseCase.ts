import { Types } from "mongoose";
import { IUpdateRuleStatusRepository } from "../../infrastructure/repositoryInterface/IUpdateRuleStatusRepository";
import { IUpdateRuleStatusUseCase } from "../use-case-interface/IUpdateRuleStatusUseCase";


export class UpdateRuleStatusUseCase implements IUpdateRuleStatusUseCase{

    constructor(
        private _updateRuleStatusRepo:IUpdateRuleStatusRepository
    ){}

    async execute(ruleId: Types.ObjectId, ruleStatus: boolean): Promise<boolean> {
        await this._updateRuleStatusRepo.updateRuleStatus(ruleId,ruleStatus)
        return ruleStatus
    }
}