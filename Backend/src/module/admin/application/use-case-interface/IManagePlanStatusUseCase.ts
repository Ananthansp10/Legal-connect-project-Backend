import { Types } from "mongoose";

export interface IManagePlanStatusUseCase {
  execute(planId: Types.ObjectId, status: string): Promise<void>;
}
