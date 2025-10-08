import { Types } from "mongoose";
import { ILawyerEditProfileResponse } from "../../application/mapper/lawyerEditProfileMapper";
import { ILawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";
import { IEditLawyerProfileRepository } from "../repositoryInterface/IEditLawyerProfileRepository";
import { lawyerProfileModel } from "../models/lawyerProfileModel";
import { BaseRepository } from "./baseRepository";

export class EditLawyerProfileRepository
  extends BaseRepository<ILawyerProfileEntity>
  implements IEditLawyerProfileRepository
{
  constructor() {
    super(lawyerProfileModel);
  }

  async editLawyerProfile(
    lawyerId: Types.ObjectId,
    data: ILawyerEditProfileResponse,
  ): Promise<void> {
    const { fee, ...personalInfo } = data;
    await lawyerProfileModel.updateOne(
      { lawyerId: lawyerId },
      { $set: { personalInfo: personalInfo, "proffessionalInfo.fee": fee } },
    );
  }
}
