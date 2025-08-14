import { LawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";
import { IGetLawyerProfileRepositorie } from "../repositoryInterface/IGetLawyerProfileRepository";
import { lawyerProfileModel } from "../models/lawyerProfileModel";
import { BaseRepositorie } from "./baseRepository";



export class GetLawyerProfileRepositorie extends BaseRepositorie<LawyerProfileEntity> implements IGetLawyerProfileRepositorie{

    constructor(){
        super(lawyerProfileModel)
    }

    async getLawyerProfile(lawyerId: string): Promise<LawyerProfileEntity | null> {
       return await lawyerProfileModel.findOne({lawyerId:lawyerId})
    }
}