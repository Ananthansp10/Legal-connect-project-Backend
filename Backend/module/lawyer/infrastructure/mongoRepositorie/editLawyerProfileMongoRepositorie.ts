import { LawyerEditProfileResponse } from "../../application/mapper/lawyerEditProfileMapper";
import { LawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";
import { IEditLawyerProfileRepositorie } from "../../interface/repositorie/editLawyerProfileRepositorie";
import { lawyerProfileModel } from "../models/lawyerProfileModel";
import { BaseMongoRepositorie } from "./baseMongoRepositorie";


export class EditLawyerProfileMongoRepositorie extends BaseMongoRepositorie<LawyerProfileEntity> implements IEditLawyerProfileRepositorie{

    constructor(){
        super(lawyerProfileModel)
    }

    async editLawyerProfile(lawyerId:string,data: LawyerEditProfileResponse): Promise<void> {
        await lawyerProfileModel.updateOne({lawyerId:lawyerId},{$set:{personalInfo:data}})
    }
}