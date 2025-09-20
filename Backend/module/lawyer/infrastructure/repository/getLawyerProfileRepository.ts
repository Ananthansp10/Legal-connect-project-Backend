import { LawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";
import { IGetLawyerProfileRepository } from "../repositoryInterface/IGetLawyerProfileRepository";
import { lawyerProfileModel } from "../models/lawyerProfileModel";
import { BaseRepository } from "./baseRepository";
import { Types } from "mongoose";



export class GetLawyerProfileRepository extends BaseRepository<LawyerProfileEntity> implements IGetLawyerProfileRepository {

    constructor() {
        super(lawyerProfileModel)
    }

    async getLawyerProfile(lawyerId: string): Promise<LawyerProfileEntity | null> {
        return await lawyerProfileModel.findOne({ lawyerId: lawyerId })
    }

    async getLawyerProfileImage(lawyerId: Types.ObjectId): Promise<string | null> {
        const lawyerDetails = await lawyerProfileModel.findOne({ lawyerId: lawyerId })
        return lawyerDetails?.personalInfo.profileImage || null
    }
}