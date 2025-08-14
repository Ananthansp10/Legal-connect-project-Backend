import { Types } from "mongoose";



export interface IUpdateRuleStatusUseCase{
    execute(ruleId:Types.ObjectId,ruleStatus:boolean):Promise<boolean>;
}