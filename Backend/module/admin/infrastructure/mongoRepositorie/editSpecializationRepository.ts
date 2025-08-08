import { Types } from "mongoose";
import { IEditSpecializationRepository } from "../../interface/repositories/IEditSpecializationRepository";
import { SpecData } from "../../interface/repositories/IEditSpecializationRepository";
import { specializationModel } from "../models/specializationModel";

export class EditSpecializationRepository implements IEditSpecializationRepository{

    async editSpecialization(specId: Types.ObjectId, data: SpecData): Promise<void> {
        await specializationModel.findByIdAndUpdate(specId,{$set:data})
    }
}