import { ISpecializationEntity } from "../../domain/entity/specializationEntity";
import { IAddSpecializationRepository } from "../repositoryInterface/IAddSpecializationRepository";
import { specializationModel } from "../models/specializationModel";


export class AddSpecializationRepository implements IAddSpecializationRepository{

    async addSpecialization(data: ISpecializationEntity): Promise<void> {
        await specializationModel.create(data)
    }
}