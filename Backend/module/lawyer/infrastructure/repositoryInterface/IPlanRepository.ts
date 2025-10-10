import { Types } from "mongoose";
import {
  ISubscribersEntity,
  IPlanDetail,
} from "../../domain/entity/subscribersEntity";
import { IPlansEntity } from "../../../admin/domain/entity/plansEntity";
import { IPlanDetailsDto } from "../../domain/dtos/planDetailsDto";

export interface IPlanRepository {
  findPlan(lawyerId: Types.ObjectId): Promise<ISubscribersEntity | null>;
  addPlan(data: ISubscribersEntity): Promise<void>;
  updatePlan(lawyerId: Types.ObjectId, plan: IPlanDetail): Promise<void>;
  getPlanDetails(planId: Types.ObjectId): Promise<IPlansEntity | null>;
  activatePlan(date: string): Promise<void>;
  expirePlan(date: string): Promise<void>;
  updatePlanAppointment(
    lawyerId: Types.ObjectId,
    planId: Types.ObjectId,
  ): Promise<void>;
  findStarterPlan(lawyerId: Types.ObjectId): Promise<IPlanDetailsDto[] | null>;
}
