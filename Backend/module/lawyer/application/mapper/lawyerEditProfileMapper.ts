import { Types } from "mongoose";

export interface LawyerEditProfileRequest {
  lawyerId: Types.ObjectId;
  name: string;
  email: string;
  phoneNumber: string;
  DOB: string;
  street: string;
  state: string;
  city: string;
  country: string;
  language: string[];
  imagePreview: string;
  profileImage: string;
  fee: number;
}

export interface LawyerEditProfileResponse {
  name: string;
  email: string;
  phoneNumber: string;
  DOB: string;
  language: string[];
  profileImage: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
  };
  fee: number;
}

export class EditLawyerProfileMapper {
  static async toResponse(
    data: LawyerEditProfileRequest,
    imageUrl: string,
  ): Promise<LawyerEditProfileResponse> {
    return {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      DOB: data.DOB,
      language: data.language,
      profileImage: imageUrl ? imageUrl : data.imagePreview,
      address: {
        street: data.street,
        city: data.city,
        state: data.state,
        country: data.country,
      },
      fee: data.fee,
    };
  }
}
