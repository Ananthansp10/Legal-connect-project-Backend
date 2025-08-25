import { Types } from "mongoose";
import { ISubscribersEntity } from "../../domain/entity/subscribersEntity";

export interface PlanData{
    lawyerId:Types.ObjectId,
    planId:Types.ObjectId,
    date:string
}

export interface IPlanRepository{
    findPlan(lawyerId:Types.ObjectId):Promise<ISubscribersEntity | null>;
    addPlan(data:PlanData):Promise<void>;
    updatePlan(lawyerId:Types.ObjectId,planId:Types.ObjectId,date:string):Promise<void>;
}