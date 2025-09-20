import { LawyerProfileResponseDto } from "../../domain/dtos/lawyerProfileDto";
import { LawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";
import { ILawyerAddProfile } from "../../infrastructure/repositoryInterface/ILawyerAddProfileRepository";
import { ILawyerProfileRequest, LawyerProfileMapper } from "../mapper/lawyerProfileMapper";
import { ILawyerAddProfileUseCase } from "../use-case-interface/ILawyerAddProfileUseCase";

export class LawyerAddProfileUseCase implements ILawyerAddProfileUseCase{

    constructor(
        private _lawyerAddProfileRepo:ILawyerAddProfile
    ){}

    async execute(data: ILawyerProfileRequest,imageUrls:{
                profileImage: { path: string }[];
                barCouncilCertificate?: { path: string }[];
                degreeCertificate?: { path: string }[];
                experienceCertificate?: { path: string }[];
                idProof?: { path: string }[];
            }): Promise<LawyerProfileResponseDto | null> {
        
        const lawyerProfileData:LawyerProfileEntity=await LawyerProfileMapper.toRequest(data,imageUrls)

        return await this._lawyerAddProfileRepo.create(lawyerProfileData)
    }
}