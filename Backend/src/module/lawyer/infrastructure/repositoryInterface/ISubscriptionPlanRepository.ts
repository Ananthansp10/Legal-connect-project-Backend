import { IPlansEntity } from "../../../admin/domain/entity/plansEntity";

export interface ISubscriptionPlanRepository {
  getSubscriptionPlans(): Promise<IPlansEntity[]>;
}
