import { Types } from "mongoose";
import { IPlanManagementRepository } from "../../infrastructure/repositoryInterface/IPlanManagementRepository";
import { IEditPlanUseCase } from "../use-case-interface/IEditPlanUseCase";
import { IPlansRequestDto } from "../../domain/dtos/plansDto";

export class EditPlanUseCase implements IEditPlanUseCase {
  constructor(private _planManagementRepo: IPlanManagementRepository) {}

  async execute(planId: Types.ObjectId, data: IPlansRequestDto): Promise<void> {
    await this._planManagementRepo.updatePlane(planId, data);
  }
}
