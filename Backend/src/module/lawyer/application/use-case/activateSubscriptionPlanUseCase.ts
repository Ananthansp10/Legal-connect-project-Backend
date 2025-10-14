import { IPlanRepository } from "../../infrastructure/repositoryInterface/IPlanRepository";
import { IActivateSubscriptionPlanUseCase } from "../use-case-interface/IActivateSubscriptionPlanUseCase";

export class ActivateSubscriptionPlanUseCase
  implements IActivateSubscriptionPlanUseCase
{
  constructor(private _planRepo: IPlanRepository) {}

  async execute(): Promise<void> {
    let currentDate = new Date().toISOString().split("T")[0];
    await this._planRepo.activatePlan(currentDate);
  }
}
