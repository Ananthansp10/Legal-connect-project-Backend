import { Types } from "mongoose";
import { LawyerEditProfileResponse } from "../../application/mapper/lawyerEditProfileMapper";
import { LawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";
import { IEditLawyerProfileRepository } from "../repositoryInterface/IEditLawyerProfileRepository";
import { lawyerProfileModel } from "../models/lawyerProfileModel";
import { BaseRepository } from "./baseRepository";


export class EditLawyerProfileRepository extends BaseRepository<LawyerProfileEntity> implements IEditLawyerProfileRepository{

    constructor(){
        super(lawyerProfileModel)
    }

    async editLawyerProfile(lawyerId:Types.ObjectId,data: LawyerEditProfileResponse): Promise<void> {
        await lawyerProfileModel.updateOne({lawyerId:lawyerId},{$set:{personalInfo:data}})
    }
}