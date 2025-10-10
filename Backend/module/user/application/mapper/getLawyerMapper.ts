import { Types } from "mongoose";
import { ILawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";

export interface IGetLawyerResponse {
  lawyerId: Types.ObjectId;
  name: string;
  specialization: string[];
  experience: string;
  country: string;
  state: string;
  profileImage: string;
}

export class GetLawyerMapper {
  static toResponse(data: ILawyerProfileEntity[]): IGetLawyerResponse[] {
    return data.map((lawyer) => ({
      lawyerId: lawyer.lawyerId,
      name: lawyer.personalInfo.name,
      specialization: lawyer.proffessionalInfo.practiceAreas,
      experience: lawyer.proffessionalInfo.experience,
      country: lawyer.personalInfo.address.country,
      state: lawyer.personalInfo.address.state,
      profileImage: lawyer.personalInfo.profileImage,
    }));
  }
}
