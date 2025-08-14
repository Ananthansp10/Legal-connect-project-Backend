import { Types } from "mongoose";
import { IUpdateRuleStatusRepository } from "../../infrastructure/repositoryInterface/IUpdateRuleStatusRepository";
import { IUpdateRuleStatusApplication } from "../use-case-interface/IUpdateRuleStatusApplication";


export class UpdateRuleStatusApplication implements IUpdateRuleStatusApplication{

    constructor(
        private _updateRuleStatusRepo:IUpdateRuleStatusRepository
    ){}

    async execute(ruleId: Types.ObjectId, ruleStatus: boolean): Promise<boolean> {
        await this._updateRuleStatusRepo.updateRuleStatus(ruleId,ruleStatus)
        return ruleStatus
    }
}