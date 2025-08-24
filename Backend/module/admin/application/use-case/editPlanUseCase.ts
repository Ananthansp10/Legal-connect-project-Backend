import { Types } from "mongoose";
import { LawyerEditProfileRequest } from "../../../lawyer/application/mapper/lawyerEditProfileMapper";
import { IPlansEntity } from "../../domain/entity/plansEntity";
import { IPlanManagementRepository } from "../../infrastructure/repositoryInterface/IPlanManagementRepository";
import { IEditPlanUseCase } from "../use-case-interface/IEditPlanUseCase";


export class EditPlanUseCase implements IEditPlanUseCase{

    constructor(
        private _planManagementRepo:IPlanManagementRepository
    ){}

    async execute(planId: Types.ObjectId, data: IPlansEntity): Promise<void> {
        await this._planManagementRepo.updatePlane(planId,data)
    }
}