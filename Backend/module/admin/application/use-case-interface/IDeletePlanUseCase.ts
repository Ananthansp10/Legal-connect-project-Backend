import { Types } from "mongoose";


export interface IDeletePlanUseCase {
    execute(planId: Types.ObjectId): Promise<void>;
}