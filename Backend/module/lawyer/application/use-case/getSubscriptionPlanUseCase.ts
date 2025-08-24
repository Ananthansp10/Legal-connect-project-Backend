import { IPlansEntity } from "../../../admin/domain/entity/plansEntity";
import { ISubscriptionPlanRepository } from "../../infrastructure/repositoryInterface/ISubscriptionPlanRepository";
import { IGetSubscriptionPlanUseCase } from "../use-case-interface/IGetSubscriptionPlanUseCase";


export class GetSubscriptionPlanUseCase implements IGetSubscriptionPlanUseCase{

    constructor(
        private _subscriptionPlanRepository:ISubscriptionPlanRepository
    ){}

    async execute(): Promise<IPlansEntity[] | null> {
      return await this._subscriptionPlanRepository.getSubscriptionPlans()
    }
}