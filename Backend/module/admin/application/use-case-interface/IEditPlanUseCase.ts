import { Types } from "mongoose";
import { IPlansRequestDto } from "../../domain/dtos/plansDto";

export interface IEditPlanUseCase {
  execute(planId: Types.ObjectId, data: IPlansRequestDto): Promise<void>;
}
