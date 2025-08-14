import { LawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";
import { BaseRepositorie } from "../../infrastructure/repository/baseRepository";
import { IGetLawyerProfileRepositorie } from "../../infrastructure/repositoryInterface/IGetLawyerProfileRepository";
import { IGetLawyerProfileApplication } from "../use-case-interface/IGetLawyerProfileApplication";



export class GetLawyerProfileApplication  implements IGetLawyerProfileApplication{

    constructor(
        private getLawyerProfileRepo:IGetLawyerProfileRepositorie
    ){}

    async execute(lawyerId: string): Promise<LawyerProfileEntity | null> {
        return await this.getLawyerProfileRepo.getLawyerProfile(lawyerId)
    }
}