import { PlansResponseDto } from "../../domain/dtos/plansDto";
import { ISubscriptionPlanRepository } from "../../infrastructure/repositoryInterface/ISubscriptionPlanRepository";
import { IGetSubscriptionPlanUseCase } from "../use-case-interface/IGetSubscriptionPlanUseCase";

export class GetSubscriptionPlanUseCase implements IGetSubscriptionPlanUseCase {
  constructor(
    private _subscriptionPlanRepository: ISubscriptionPlanRepository
  ) {}

  async execute(): Promise<PlansResponseDto[] | null> {
    return await this._subscriptionPlanRepository.getSubscriptionPlans();
  }
}
