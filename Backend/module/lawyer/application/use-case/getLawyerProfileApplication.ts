import { LawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";
import { BaseMongoRepositorie } from "../../infrastructure/mongoRepositorie/baseMongoRepositorie";
import { IGetLawyerProfileRepositorie } from "../../interface/repositorie/getLawyerProfileRepositorie";
import { IGetLawyerProfileApplication } from "../use-case-interface/IGetLawyerProfileApplication";



export class GetLawyerProfileApplication  implements IGetLawyerProfileApplication{

    constructor(
        private getLawyerProfileRepo:IGetLawyerProfileRepositorie
    ){}

    async execute(lawyerId: string): Promise<LawyerProfileEntity | null> {
        return await this.getLawyerProfileRepo.getLawyerProfile(lawyerId)
    }
}