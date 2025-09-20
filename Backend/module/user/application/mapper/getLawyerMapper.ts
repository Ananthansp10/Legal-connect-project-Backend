import { Types } from "mongoose";
import { LawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";


export interface getLawyerResponse {
    lawyerId: Types.ObjectId;
    name: string;
    specialization: string[];
    experience: string;
    country: string;
    state: string;
    profileImage: string;
}


export class GetLawyerMapper {

    static toResponse(data: LawyerProfileEntity[]): getLawyerResponse[] {
        return data.map((lawyer) => ({
            lawyerId: lawyer.lawyerId,
            name: lawyer.personalInfo.name,
            specialization: lawyer.proffessionalInfo.practiceAreas,
            experience: lawyer.proffessionalInfo.experience,
            country: lawyer.personalInfo.address.country,
            state: lawyer.personalInfo.address.state,
            profileImage: lawyer.personalInfo.profileImage
        }))
    }
}