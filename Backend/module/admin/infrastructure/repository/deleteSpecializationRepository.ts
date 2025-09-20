import { IDeleteSpecializationRepository } from "../repositoryInterface/IDeleteSpecializationRepository";
import { specializationModel } from "../models/specializationModel";


export class DeleteSpecializationRepository implements IDeleteSpecializationRepository {

    async deleteSpecialization(specId: string): Promise<void> {
        await specializationModel.findByIdAndUpdate({ _id: specId }, { $set: { isDeleted: true } })
    }
}