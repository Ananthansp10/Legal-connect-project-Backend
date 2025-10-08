import { Types } from "mongoose";

export interface IFindStarterPlanUseCase {
  execute(lawyerId: Types.ObjectId): Promise<boolean>;
}
