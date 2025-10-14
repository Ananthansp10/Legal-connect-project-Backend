import { Types } from "mongoose";
import { ISubscriptionPlanResponseDto } from "../../domain/dtos/plansDto";

export interface IGetPurchasedPlansUseCase {
  execute(
    lawyerId: Types.ObjectId,
  ): Promise<ISubscriptionPlanResponseDto | null>;
}
