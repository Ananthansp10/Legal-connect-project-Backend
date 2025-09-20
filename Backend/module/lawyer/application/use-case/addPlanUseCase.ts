
import { Types } from "mongoose";
import { IPlanRepository } from "../../infrastructure/repositoryInterface/IPlanRepository";
import { IAddPlanUseCase } from "../use-case-interface/IAddPlanUseCase";

export class AddPlanUseCase implements IAddPlanUseCase {

    constructor(
        private _planRepo: IPlanRepository
    ) { }

    async execute(lawyerId: Types.ObjectId, planId: Types.ObjectId, price: string): Promise<void> {
        const planExist = await this._planRepo.findPlan(lawyerId)
        const currentDate = new Date().toISOString().split('T')[0]
        if (planExist) {
            let planObj = {
                planId: planId,
                date: currentDate,
                price: Number(price)
            }
            await this._planRepo.updatePlan(lawyerId, planObj)
        } else {
            let plan = {
                lawyerId: lawyerId,
                plans: [
                    {
                        planId: planId,
                        date: currentDate,
                        price: Number(price)
                    }
                ]
            }
            await this._planRepo.addPlan(plan)
        }
    }
}