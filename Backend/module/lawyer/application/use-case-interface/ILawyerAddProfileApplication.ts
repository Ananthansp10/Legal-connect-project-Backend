import { LawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";
import { ILawyerProfileRequest } from "../mapper/lawyerProfileMapper";


export interface ILawyerAddProfileApplication{
    execute(data:ILawyerProfileRequest,imageUrls:{
                profileImage: { path: string }[];
                barCouncilCertificate?: { path: string }[];
                degreeCertificate?: { path: string }[];
                experienceCertificate?: { path: string }[];
                idProof?: { path: string }[];
            }):Promise<LawyerProfileEntity | null>
}