import { Types } from "mongoose";
import { IPlanRepository } from "../../infrastructure/repositoryInterface/IPlanRepository";
import { IFindStarterPlanUseCase } from "../use-case-interface/IFindStarterPlanUseCase";

export class FindStarterPlanUseCase implements IFindStarterPlanUseCase {
  constructor(private _planRepo: IPlanRepository) {}

  async execute(lawyerId: Types.ObjectId): Promise<boolean> {
    let result = await this._planRepo.findStarterPlan(lawyerId);
    let isStarterPlanExist = result?.find(
      (plan) => plan.planDetails.name == "Starter Plan",
    );
    return isStarterPlanExist ? true : false;
  }
}
