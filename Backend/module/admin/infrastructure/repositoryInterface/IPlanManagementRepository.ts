import { Types } from "mongoose";
import { IPlansEntity } from "../../domain/entity/plansEntity";

export interface IPlanManagementRepository {
  addPlan(data: IPlansEntity): Promise<void>;
  isPlanExist(name: string): Promise<IPlansEntity | null>;
  updatePlane(planId: Types.ObjectId, data: IPlansEntity): Promise<void>;
  setPlanStatus(planId: Types.ObjectId, status: string): Promise<void>;
  deletePlan(planId: Types.ObjectId): Promise<void>;
  getPlans(): Promise<IPlansEntity[] | null>;
  getActivePlans(): Promise<number>;
  getInActivePlans(): Promise<number>;
  getMostPopularPlan(): Promise<string>;
  getMonthlyIncome(): Promise<number>;
  searchPlan(planName: string): Promise<IPlansEntity[] | null>;
}
