
import { Types } from "mongoose";
import { IPlanRepository } from "../../infrastructure/repositoryInterface/IPlanRepository";
import { IAddPlanUseCase } from "../use-case-interface/IAddPlanUseCase";


export class AddPlanUseCase implements IAddPlanUseCase{

    constructor(
        private _planRepo:IPlanRepository
    ){}

    async execute(lawyerId: Types.ObjectId, planId: Types.ObjectId): Promise<void> {
        let planExist=await this._planRepo.findPlan(lawyerId)
        let currentDate=new Date().toISOString().split('T')[0]
        if(planExist){
            await this._planRepo.updatePlan(lawyerId,planId,currentDate)
        }else{
            await this._planRepo.addPlan({lawyerId:lawyerId,planId:planId,date:currentDate})
        }
    }
}