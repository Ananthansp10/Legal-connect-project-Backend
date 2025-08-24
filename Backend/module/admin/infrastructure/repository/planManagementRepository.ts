import { Types } from "mongoose";
import { IPlansEntity } from "../../domain/entity/plansEntity";
import { planModel } from "../models/planModel";
import { IPlanManagementRepository } from "../repositoryInterface/IPlanManagementRepository";


export class PlanManagementRepository implements IPlanManagementRepository{

    async addPlan(data: IPlansEntity): Promise<void> {
        await planModel.create(data)
    }

    async isPlanExist(name: string): Promise<IPlansEntity | null> {
        return await planModel.findOne({name:name}) 
    }

    async updatePlane(planId: Types.ObjectId, data: IPlansEntity): Promise<void> {
        await planModel.findByIdAndUpdate(planId,{$set:data})
    }

    async setPlanStatus(planId: Types.ObjectId, status: string): Promise<void> {
        await planModel.findByIdAndUpdate(planId,{$set:{status:status == 'Activate' ? true : false}})
    }

    async deletePlan(planId: Types.ObjectId): Promise<void> {
        await planModel.findByIdAndUpdate(planId,{$set:{isDeleted:true}})
    }

    async getPlans(): Promise<IPlansEntity[] | null> {
        return await planModel.find({isDeleted:false})
    }
}