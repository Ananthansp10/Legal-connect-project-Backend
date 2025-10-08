import { SpecializationRequestDto } from "../../domain/dtos/specializationDto";
import { ISpecializationEntity } from "../../domain/entity/specializationEntity";
import { IAddSpecializationRepository } from "../../infrastructure/repositoryInterface/IAddSpecializationRepository";
import { IAddSpecializationUseCase } from "../use-case-interface/IAddSpecialisationUseCase";

export class AddSpecializationUseCase implements IAddSpecializationUseCase {
  constructor(private _addSpecialization: IAddSpecializationRepository) {}

  async execute(data: SpecializationRequestDto): Promise<void> {
    await this._addSpecialization.addSpecialization(data);
  }
}
