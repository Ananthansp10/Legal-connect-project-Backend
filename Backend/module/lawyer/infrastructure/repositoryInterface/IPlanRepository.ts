import { Types } from "mongoose";
import { ISubscribersEntity, PlanDetail } from "../../domain/entity/subscribersEntity";

export interface IPlanRepository{
    findPlan(lawyerId:Types.ObjectId):Promise<ISubscribersEntity | null>;
    addPlan(data:ISubscribersEntity):Promise<void>;
    updatePlan(lawyerId:Types.ObjectId,plan:PlanDetail):Promise<void>;
}