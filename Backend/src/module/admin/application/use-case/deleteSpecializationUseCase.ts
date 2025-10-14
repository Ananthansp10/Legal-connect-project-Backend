import { IDeleteSpecializationRepository } from "../../infrastructure/repositoryInterface/IDeleteSpecializationRepository";
import { IDeleteSpecializationUseCase } from "../use-case-interface/IDeleteSpecializationUseCase";

export class DeleteSpecializationUseCase
  implements IDeleteSpecializationUseCase
{
  constructor(
    private _deleteSpecializationRepo: IDeleteSpecializationRepository,
  ) {}

  async execute(specId: string): Promise<void> {
    await this._deleteSpecializationRepo.deleteSpecialization(specId);
  }
}
