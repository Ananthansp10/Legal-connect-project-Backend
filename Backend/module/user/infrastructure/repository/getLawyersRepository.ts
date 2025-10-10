import { ILawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { lawyerProfileModel } from "../../../lawyer/infrastructure/models/lawyerProfileModel";
import { IGetLawyerRepository } from "../repositoryInterface/IGetLawyerRepository";
import { BaseRepository } from "./baseRepository";

export class GetLawyerRepository
  extends BaseRepository<ILawyerProfileEntity>
  implements IGetLawyerRepository
{
  constructor() {
    super(lawyerProfileModel);
  }

  async getLawyers(): Promise<ILawyerProfileEntity[]> {
    return await lawyerProfileModel.find();
  }

  async getLawyerById(lawyerId: string): Promise<ILawyerProfileEntity | null> {
    return await lawyerProfileModel.findOne({ lawyerId: lawyerId });
  }

  async getLawyerBySpecialization(
    specialization: string,
  ): Promise<ILawyerProfileEntity[] | null> {
    if (specialization == "All Specializations") {
      return await lawyerProfileModel.find();
    } else {
      return await lawyerProfileModel.find({
        "proffessionalInfo.practiceAreas": { $in: [specialization] },
      });
    }
  }

  async getLawyerByName(name: string): Promise<ILawyerProfileEntity[] | null> {
    return await lawyerProfileModel.find({
      "personalInfo.name": { $regex: new RegExp(`^${name}$`, "i") },
    });
  }
}
