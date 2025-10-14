import { Types } from "mongoose";
import { ISubscriptionPlanResponseDto } from "../../domain/dtos/plansDto";
import { IPlanRepository } from "../../infrastructure/repositoryInterface/IPlanRepository";
import { IGetPurchasedPlansUseCase } from "../use-case-interface/IGetPurchasedPlansUseCase";

export class GetPurchasedPlansUseCase implements IGetPurchasedPlansUseCase {
  constructor(private _planRepo: IPlanRepository) {}

  async execute(
    lawyerId: Types.ObjectId,
  ): Promise<ISubscriptionPlanResponseDto | null> {
    const plans = await this._planRepo.findPlan(lawyerId);
    if (!plans || plans.plans.length == 0) {
      return null;
    }
    const result = await Promise.all(
      plans.plans.map(async (plan) => {
        const planDetails = await this._planRepo.getPlanDetails(plan.planId);
        return {
          planId: plan.planId,
          planName: planDetails?.name ?? "",
          date: plan.date,
          activationDate: plan.activationDate,
          expireDate: plan.expireDate,
          isActive: plan.isActive,
          totalAppointments: plan.totalAppointments,
          appointmentsCount: plan.appointmentsCount,
          price: plan.price,
        };
      }),
    );
    return { lawyerId: lawyerId, plans: result };
  }
}
