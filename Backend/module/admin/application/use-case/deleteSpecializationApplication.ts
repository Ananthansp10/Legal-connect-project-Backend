import { Types } from "mongoose";
import { IDeleteSpecializationRepository } from "../../interface/repositories/IDeleteSpecializationRepository";
import { IDeleteSpecializationApplication } from "../use-case-interface/IDeleteSpecializationApplication";



export class DeleteSpecializationApplication implements IDeleteSpecializationApplication{

    constructor(
        private _deleteSpecializationRepo:IDeleteSpecializationRepository
    ){}

    async execute(specId: string): Promise<void> {
        await this._deleteSpecializationRepo.deleteSpecialization(specId)
    }
}