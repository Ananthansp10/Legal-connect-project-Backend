import { IPlansResponseDto } from "../../domain/dtos/plansDto";

export interface IGetSubscriptionPlanUseCase {
  execute(): Promise<IPlansResponseDto[] | null>;
}
