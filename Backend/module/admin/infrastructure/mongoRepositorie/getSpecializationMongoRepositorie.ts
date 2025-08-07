import { ISpecializationEntity } from "../../domain/entity/specializationEntity";
import { IGetSpecializationRepositorie } from "../../interface/repositories/IGetSpecializationRepositorie";
import { specializationModel } from "../models/specializationModel";


export class GetSpecializationMongoRepositorie implements IGetSpecializationRepositorie{

    async getSpecialization(): Promise<ISpecializationEntity[] | null> {
       return await specializationModel.find()
    }
}