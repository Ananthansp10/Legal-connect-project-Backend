import { LawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { lawyerProfileModel } from "../../../lawyer/infrastructure/models/lawyerProfileModel";
import { IGetLawyerRepositorie } from "../../interface/repositorie/getLawyerRepositorie";
import { BaseMongoRepositorie } from "./baseMongoRepositorie";



export class GetLawyerMongoRepositorie extends BaseMongoRepositorie<LawyerProfileEntity> implements IGetLawyerRepositorie{

    constructor(){
        super(lawyerProfileModel)
    }

    async getLawyers(): Promise<LawyerProfileEntity[]> {
        return await lawyerProfileModel.find()
    }

    async getLawyerById(lawyerId: string): Promise<LawyerProfileEntity | null> {
        return await lawyerProfileModel.findOne({lawyerId:lawyerId})
    }
}