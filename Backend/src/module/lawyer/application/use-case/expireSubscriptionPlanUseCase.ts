import { IPlanRepository } from "../../infrastructure/repositoryInterface/IPlanRepository";
import { IExpireSubscriptionPlanUseCase } from "../use-case-interface/IExpireSubscriptionPlanUseCase";

export class ExpireSubscriptionPlanUseCase
  implements IExpireSubscriptionPlanUseCase
{
  constructor(private _planRepo: IPlanRepository) {}

  async execute(): Promise<void> {
    let currentDate = new Date().toISOString().split("T")[0];
    await this._planRepo.expirePlan(currentDate);
  }
}
