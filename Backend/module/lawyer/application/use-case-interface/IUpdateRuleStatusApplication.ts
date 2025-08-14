import { Types } from "mongoose";



export interface IUpdateRuleStatusApplication{
    execute(ruleId:Types.ObjectId,ruleStatus:boolean):Promise<boolean>;
}