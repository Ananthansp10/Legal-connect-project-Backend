import { ILawyerProfileResponseDto } from "../../../lawyer/domain/dtos/lawyerProfileDto";
import { IGetLawyerRepository } from "../../infrastructure/repositoryInterface/IGetLawyerRepository";
import { IGetLawyerDetailsUseCase } from "../use-case-interface/IGetLawyerDetailsUseCase";

export class GetLawyerDetailsUseCase implements IGetLawyerDetailsUseCase {
  constructor(private _getLawyerDetailsRepo: IGetLawyerRepository) {}

  async execute(lawyerId: string): Promise<ILawyerProfileResponseDto | null> {
    return await this._getLawyerDetailsRepo.getLawyerById(lawyerId);
  }
}
