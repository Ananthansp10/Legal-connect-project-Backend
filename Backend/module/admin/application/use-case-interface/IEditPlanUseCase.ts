import { Types } from "mongoose";
import { PlansRequestDto } from "../../domain/dtos/plansDto";

export interface IEditPlanUseCase {
  execute(planId: Types.ObjectId, data: PlansRequestDto): Promise<void>;
}
