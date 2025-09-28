import { Types } from 'mongoose';
import { IPlanManagementRepository } from '../../infrastructure/repositoryInterface/IPlanManagementRepository';
import { IDeletePlanUseCase } from '../use-case-interface/IDeletePlanUseCase';


export class DeletePlanUseCase implements IDeletePlanUseCase {

    constructor(
        private _planManagementRepo: IPlanManagementRepository
    ) { }

    async execute(planId: Types.ObjectId): Promise<void> {
        await this._planManagementRepo.deletePlan(planId)
    }
}