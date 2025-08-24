import { Types } from "mongoose";
import { ISubscribersEntity } from "../../domain/entity/subscribersEntity";
import { IPlanRepository, PlanData } from "../repositoryInterface/IPlanRepository";
import { subscribersModel } from "../models/subscribersModel";


export class PlanRepository implements IPlanRepository{

    async findPlan(lawyerId: Types.ObjectId): Promise<ISubscribersEntity | null> {
        return await subscribersModel.findOne({lawyerId:lawyerId})
    }

    async addPlan(data: PlanData): Promise<void> {
        await subscribersModel.create(data)
    }

    async updatePlan(lawyerId: Types.ObjectId, planId: Types.ObjectId, date: string): Promise<void> {
        await subscribersModel.updateOne({lawyerId:lawyerId},{$set:{planId:planId,date:date}})
    }
}