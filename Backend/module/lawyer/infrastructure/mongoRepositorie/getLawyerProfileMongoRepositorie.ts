import { LawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";
import { IGetLawyerProfileRepositorie } from "../../interface/repositorie/getLawyerProfileRepositorie";
import { lawyerProfileModel } from "../models/lawyerProfileModel";
import { BaseMongoRepositorie } from "./baseMongoRepositorie";



export class GetLawyerProfileMongoRepositorie extends BaseMongoRepositorie<LawyerProfileEntity> implements IGetLawyerProfileRepositorie{

    constructor(){
        super(lawyerProfileModel)
    }

    async getLawyerProfile(lawyerId: string): Promise<LawyerProfileEntity | null> {
       return await lawyerProfileModel.findOne({lawyerId:lawyerId})
    }
}