import { LawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";
import { ILawyerAddProfile } from "../../interface/repositorie/lawyerAddProfileRepositorie";
import { ILawyerProfileRequest, LawyerProfileMapper } from "../mapper/lawyerProfileMapper";
import { ILawyerAddProfileApplication } from "../use-case-interface/ILawyerAddProfileApplication";

export class LawyerAddProfileAppliaction implements ILawyerAddProfileApplication{

    constructor(
        private _lawyerAddProfileRepo:ILawyerAddProfile
    ){}

    async execute(data: ILawyerProfileRequest,imageUrls:{
                profileImage: { path: string }[];
                barCouncilCertificate?: { path: string }[];
                degreeCertificate?: { path: string }[];
                experienceCertificate?: { path: string }[];
                idProof?: { path: string }[];
            }): Promise<LawyerProfileEntity | null> {
        
        let lawyerProfileData:LawyerProfileEntity=await LawyerProfileMapper.toRequest(data,imageUrls)

        return await this._lawyerAddProfileRepo.create(lawyerProfileData)
    }
}