import { Types } from "mongoose";
import { ILawyerProfileDataDto } from "../../domain/dtos/lawyerProfileDataDto";
import { ILawyerRepository } from "../../infrastructure/repositoryInterface/ILawyerRepository";
import { IGetLawyerProfileDataUseCase } from "../use-case-interface/IGetLawyerProfileUseCase";

export class GetLawyerProfileDataUseCase
  implements IGetLawyerProfileDataUseCase
{
  constructor(private _lawyerRepo: ILawyerRepository) {}

  async execute(
    lawyerId: Types.ObjectId,
  ): Promise<ILawyerProfileDataDto | null> {
    const lawyerProfileDetails =
      await this._lawyerRepo.getLawyerDetails(lawyerId);
    if (!lawyerProfileDetails) {
      return null;
    } else {
      const lawyerProfileDataObj = {
        personalInfo: lawyerProfileDetails.personalInfo,
        professionalInfo: lawyerProfileDetails.proffessionalInfo,
      };
      return lawyerProfileDataObj;
    }
  }
}
