import { ISpecializationEntity } from "../../domain/entity/specializationEntity";
import { IGetSpecializationRepository } from "../repositoryInterface/IGetSpecializationRepository";
import { specializationModel } from "../models/specializationModel";


export class GetSpecializationRepository implements IGetSpecializationRepository {

    async getSpecialization(startIndex: number, limit: number): Promise<{ specializations: ISpecializationEntity[], totalSpecializations: number } | null> {
        let specializations = await specializationModel.find({ isDeleted: false }).skip(startIndex).limit(limit)
        let totalSpecializations = await specializationModel.countDocuments({ isDeleted: false })
        return { specializations, totalSpecializations }
    }
}