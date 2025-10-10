import { ILawyerProfileResponseDto } from "../../domain/dtos/lawyerProfileDto";
import { IGetLawyerProfileRepository } from "../../infrastructure/repositoryInterface/IGetLawyerProfileRepository";
import { IGetLawyerProfileUseCase } from "../use-case-interface/IGetLawyerProfileUseCase";

export class GetLawyerProfileUseCase implements IGetLawyerProfileUseCase {
  constructor(private _getLawyerProfileRepo: IGetLawyerProfileRepository) {}

  async execute(lawyerId: string): Promise<ILawyerProfileResponseDto | null> {
    return await this._getLawyerProfileRepo.getLawyerProfile(lawyerId);
  }
}
