import { ISpecializationEntity } from "../../domain/entity/specializationEntity";
import { IGetSpecializationRepository } from "../../interface/repositories/IGetSpecializationRepository";
import { specializationModel } from "../models/specializationModel";


export class GetSpecializationRepository implements IGetSpecializationRepository{

    async getSpecialization(): Promise<ISpecializationEntity[] | null> {
       return await specializationModel.find({isDeleted:false})
    }
}