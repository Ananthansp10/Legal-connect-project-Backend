import { Types } from "mongoose";

export interface IAddPlanUseCase {
  execute(
    lawyerId: Types.ObjectId,
    planId: Types.ObjectId,
    price: string,
  ): Promise<void>;
}
