import { Types } from "mongoose";
import { LawyerEditProfileResponse } from "../../application/mapper/lawyerEditProfileMapper";
import { LawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";
import { IEditLawyerProfileRepositorie } from "../repositoryInterface/IEditLawyerProfileRepository";
import { lawyerProfileModel } from "../models/lawyerProfileModel";
import { BaseRepositorie } from "./baseRepository";


export class EditLawyerProfileRepositorie extends BaseRepositorie<LawyerProfileEntity> implements IEditLawyerProfileRepositorie{

    constructor(){
        super(lawyerProfileModel)
    }

    async editLawyerProfile(lawyerId:Types.ObjectId,data: LawyerEditProfileResponse): Promise<void> {
        await lawyerProfileModel.updateOne({lawyerId:lawyerId},{$set:{personalInfo:data}})
    }
}