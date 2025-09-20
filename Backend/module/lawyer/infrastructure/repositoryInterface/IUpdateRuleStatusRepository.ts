import { Types } from "mongoose";


export interface IUpdateRuleStatusRepository {
    updateRuleStatus(ruleId: Types.ObjectId, ruleStatus: boolean): Promise<void>;
}