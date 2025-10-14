import { Types } from "mongoose";
import { IPlanManagementRepository } from "../../infrastructure/repositoryInterface/IPlanManagementRepository";
import { IManagePlanStatusUseCase } from "../use-case-interface/IManagePlanStatusUseCase";

export class ManagePlanStatusUseCase implements IManagePlanStatusUseCase {
  constructor(private _planManagementRepository: IPlanManagementRepository) {}

  async execute(planId: Types.ObjectId, status: string): Promise<void> {
    await this._planManagementRepository.setPlanStatus(planId, status);
  }
}
