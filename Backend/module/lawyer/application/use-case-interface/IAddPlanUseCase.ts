import { Types } from "mongoose";


export interface IAddPlanUseCase{
    execute(lawyerId:Types.ObjectId,planId:Types.ObjectId):Promise<void>;
}