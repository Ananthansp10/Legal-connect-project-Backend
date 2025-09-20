import { LawyerProfileResponseDto } from "../../domain/dtos/lawyerProfileDto";
import { LawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";
import { ILawyerProfileRequest } from "../mapper/lawyerProfileMapper";


export interface ILawyerAddProfileUseCase {
    execute(data: ILawyerProfileRequest, imageUrls: {
        profileImage: { path: string }[];
        barCouncilCertificate?: { path: string }[];
        degreeCertificate?: { path: string }[];
        experienceCertificate?: { path: string }[];
        idProof?: { path: string }[];
    }): Promise<LawyerProfileResponseDto | null>
}