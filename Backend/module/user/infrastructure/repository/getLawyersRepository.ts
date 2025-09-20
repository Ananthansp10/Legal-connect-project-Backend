import { LawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { lawyerProfileModel } from "../../../lawyer/infrastructure/models/lawyerProfileModel";
import { IGetLawyerRepository } from "../repositoryInterface/IGetLawyerRepository";
import { BaseRepository } from "./baseRepository";



export class GetLawyerRepository extends BaseRepository<LawyerProfileEntity> implements IGetLawyerRepository {

    constructor() {
        super(lawyerProfileModel)
    }

    async getLawyers(): Promise<LawyerProfileEntity[]> {
        return await lawyerProfileModel.find()
    }

    async getLawyerById(lawyerId: string): Promise<LawyerProfileEntity | null> {
        return await lawyerProfileModel.findOne({ lawyerId: lawyerId })
    }

    async getLawyerBySpecialization(specialization: string): Promise<LawyerProfileEntity[] | null> {
        if (specialization == "All Specializations") {
            return await lawyerProfileModel.find()
        } else {
            return await lawyerProfileModel.find({ 'proffessionalInfo.practiceAreas': { $in: [specialization] } })
        }
    }

    async getLawyerByName(name: string): Promise<LawyerProfileEntity[] | null> {
        return await lawyerProfileModel.find({ "personalInfo.name": { $regex: new RegExp(`^${name}$`, 'i') } })
    }
}