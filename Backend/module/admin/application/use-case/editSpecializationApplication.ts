import { Types } from "mongoose";
import { IEditSpecializationRepository, SpecData } from "../../interface/repositories/IEditSpecializationRepository";
import { IEditSpecializationApplication } from "../use-case-interface/IEditSpecializationApplication";


export class EditSpecializationApplication implements IEditSpecializationApplication{

    constructor(
        private _editSpecializationRepo:IEditSpecializationRepository
    ){}

    async execute(specId: Types.ObjectId, data: SpecData): Promise<void> {
        await this._editSpecializationRepo.editSpecialization(specId,data)
    }
}