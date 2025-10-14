import { ISpecializationRequestDto } from "../../domain/dtos/specializationDto";
import { IAddSpecializationRepository } from "../../infrastructure/repositoryInterface/IAddSpecializationRepository";
import { IAddSpecializationUseCase } from "../use-case-interface/IAddSpecialisationUseCase";

export class AddSpecializationUseCase implements IAddSpecializationUseCase {
  constructor(private _addSpecialization: IAddSpecializationRepository) {}

  async execute(data: ISpecializationRequestDto): Promise<void> {
    await this._addSpecialization.addSpecialization(data);
  }
}
