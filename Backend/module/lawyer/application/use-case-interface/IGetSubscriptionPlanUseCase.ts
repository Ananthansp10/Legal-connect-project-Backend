import { PlansResponseDto } from "../../domain/dtos/plansDto";

export interface IGetSubscriptionPlanUseCase {
  execute(): Promise<PlansResponseDto[] | null>;
}
