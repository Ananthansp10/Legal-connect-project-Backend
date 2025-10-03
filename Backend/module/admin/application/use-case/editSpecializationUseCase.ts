import { Types } from "mongoose";
import {
  IEditSpecializationRepository,
  SpecData,
} from "../../infrastructure/repositoryInterface/IEditSpecializationRepository";
import { IEditSpecializationUseCase } from "../use-case-interface/IEditSpecializationUseCase";

export class EditSpecializationUseCase implements IEditSpecializationUseCase {
  constructor(private _editSpecializationRepo: IEditSpecializationRepository) {}

  async execute(specId: Types.ObjectId, data: SpecData): Promise<void> {
    await this._editSpecializationRepo.editSpecialization(specId, data);
  }
}
