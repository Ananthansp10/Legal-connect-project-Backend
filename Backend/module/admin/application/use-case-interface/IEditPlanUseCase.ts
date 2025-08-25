import { Types } from "mongoose";
import { IPlansEntity } from "../../domain/entity/plansEntity";


export interface IEditPlanUseCase{
    execute(planId:Types.ObjectId,data:IPlansEntity):Promise<void>;
}