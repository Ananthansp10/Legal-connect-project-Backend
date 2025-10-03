import { Types } from "mongoose";
import { LawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";

export interface ILawyerProfileRequest {
  lawyerId: Types.ObjectId;
  name: string;
  email: string;
  phoneNumber: string;
  DOB: string;
  gender: string;
  street: string;
  city: string;
  state: string;
  country: string;
  language: string[];
  profileImage: string[];

  practiceAreas: string[];
  barRegisterNumber: string;
  experience: string;
  courtName: string;
  workLocation: string;
  fee: string;
  availableDays: string[];
  startTime: string;
  endTime: string;
  education: {
    degree: string;
    university: string;
    year: string;
  };
}

export class LawyerProfileMapper {
  static async toRequest(
    data: ILawyerProfileRequest,
    imageUrl: {
      profileImage: { path: string }[];
      barCouncilCertificate?: { path: string }[];
      degreeCertificate?: { path: string }[];
      experienceCertificate?: { path: string }[];
      idProof?: { path: string }[];
    },
  ): Promise<LawyerProfileEntity> {
    return {
      lawyerId: data.lawyerId,
      personalInfo: {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        DOB: data.DOB,
        gender: data.gender,
        address: {
          street: data.street,
          country: data.country,
          state: data.state,
          city: data.city,
        },
        language: data.language,
        profileImage: imageUrl.profileImage[0].path,
      },
      proffessionalInfo: {
        practiceAreas: data.practiceAreas,
        barRegisterNumber: data.barRegisterNumber,
        experience: data.experience,
        courtName: data.courtName,
        workLocation: data.workLocation,
        fee: data.fee,
        availableDays: data.availableDays,
        startTime: data.startTime,
        endTime: data.endTime,
        education: data.education,
        documents: [
          imageUrl.barCouncilCertificate?.[0]?.path || "",
          imageUrl.degreeCertificate?.[0]?.path || "",
          imageUrl.experienceCertificate?.[0]?.path || "",
          imageUrl.idProof?.[0]?.path || "",
        ],
      },
    };
  }
}
