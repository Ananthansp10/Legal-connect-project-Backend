import { Types } from "mongoose";
import { UserProfileEntitie } from "../../domain/entity/userProfileUserEntity";

export interface UserProfile {
    userId: Types.ObjectId;
    name: string;
    email: string;
    phoneNumber: string;
    gender: string;
    DOB: string;
    proffession: string;
    company: string;
    profileImage: string
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string
}
export class UserProfileMapper {

    static toRequest(data: UserProfile, imageUrl: string): UserProfileEntitie {
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
            address: { street: data.street, city: data.city, state: data.state, country: data.country, zipCode: data.zipCode }
        }
    }
}