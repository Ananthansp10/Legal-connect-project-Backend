import { ISpecializationEntity } from "../../domain/entity/specializationEntity";
import { IAddSpecializationRepositorie } from "../../interface/repositories/IAddSpecializationRepositorie";
import { specializationModel } from "../models/specializationModel";


export class AddSpecializationMongoRepositorie implements IAddSpecializationRepositorie{

    async addSpecialization(data: ISpecializationEntity): Promise<void> {
        await specializationModel.create(data)
    }
}