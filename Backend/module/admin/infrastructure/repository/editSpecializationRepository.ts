import { Types } from "mongoose";
import { IEditSpecializationRepository } from "../repositoryInterface/IEditSpecializationRepository";
import { ISpecData } from "../repositoryInterface/IEditSpecializationRepository";
import { specializationModel } from "../models/specializationModel";

export class EditSpecializationRepository
  implements IEditSpecializationRepository
{
  async editSpecialization(
    specId: Types.ObjectId,
    data: ISpecData,
  ): Promise<void> {
    await specializationModel.findByIdAndUpdate(specId, { $set: data });
  }
}
