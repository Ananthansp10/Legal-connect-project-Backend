import { Types } from "mongoose";
import { IUserProfileEntitie } from "../../domain/entity/userProfileUserEntity";

export interface IUserProfile {
  userId: Types.ObjectId;
  name: string;
  email: string;
  phoneNumber: string;
  gender: string;
  DOB: string;
  proffession: string;
  company: string;
  profileImage: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}
export class UserProfileMapper {
  static toRequest(data: IUserProfile, imageUrl: string): IUserProfileEntitie {
    return {
      userId: data.userId,
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      gender: data.gender,
      DOB: data.DOB,
      proffession: data.proffession,
      company: data.company,
      profileImage: imageUrl,
      address: {
        street: data.street,
        city: data.city,
        state: data.state,
        country: data.country,
        zipCode: data.zipCode,
      },
    };
  }
}
