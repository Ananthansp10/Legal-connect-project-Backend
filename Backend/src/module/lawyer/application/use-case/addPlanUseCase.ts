import { Types } from "mongoose";
import { IPlanRepository } from "../../infrastructure/repositoryInterface/IPlanRepository";
import { IAddPlanUseCase } from "../use-case-interface/IAddPlanUseCase";

export class AddPlanUseCase implements IAddPlanUseCase {
  constructor(private _planRepo: IPlanRepository) {}

  async execute(
    lawyerId: Types.ObjectId,
    planId: Types.ObjectId,
    price: string,
  ): Promise<void> {
    const planExist = await this._planRepo.findPlan(lawyerId);
    const currentDate = new Date().toISOString().split("T")[0];
    const planDetails = await this._planRepo.getPlanDetails(planId);
    const duration = planDetails?.duration ?? 0;
    const expireDate = new Date(currentDate);
    expireDate.setDate(new Date(currentDate).getDate() + duration);
    const lastPlanDetails = planExist?.plans[planExist.plans.length - 1];
    if (planExist) {
      const planExpireDate = new Date(
        lastPlanDetails?.expireDate ?? "",
      ).setDate(
        new Date(lastPlanDetails?.expireDate ?? "").getDate() + duration + 1,
      );
      const activationDate = new Date(
        lastPlanDetails?.expireDate ?? "",
      ).setDate(new Date(lastPlanDetails?.expireDate ?? "").getDate() + 1);
      let planObj = {
        planId: planId,
        date: currentDate,
        price: Number(price),
        activationDate: new Date(activationDate).toISOString().split("T")[0],
        expireDate: new Date(planExpireDate).toISOString().split("T")[0],
        isActive: false,
        totalAppointments:
          planDetails?.totalAppointments == "Infinity"
            ? Infinity
            : parseInt(planDetails?.totalAppointments ?? "0"),
        appointmentsCount: 0,
      };
      await this._planRepo.updatePlan(lawyerId, planObj);
    } else {
      let plan = {
        lawyerId: lawyerId,
        plans: [
          {
            planId: planId,
            date: currentDate,
            price: Number(price),
            activationDate: new Date().toISOString().split("T")[0],
            expireDate: expireDate.toISOString().split("T")[0],
            isActive: true,
            totalAppointments: isNaN(
              parseInt(planDetails?.totalAppointments ?? "0"),
            )
              ? Infinity
              : parseInt(planDetails?.totalAppointments ?? "0"),
            appointmentsCount: 0,
          },
        ],
      };
      await this._planRepo.addPlan(plan);
    }
  }
}
