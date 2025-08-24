import { IPlansEntity } from "../../../admin/domain/entity/plansEntity";
import { planModel } from "../../../admin/infrastructure/models/planModel";
import { ISubscriptionPlanRepository } from "../repositoryInterface/ISubscriptionPlanRepository";


export class SubscriptionPlanRepository implements ISubscriptionPlanRepository{

    async getSubscriptionPlans(): Promise<IPlansEntity[]> {
       return await planModel.find({isDeleted:false})
    }
}