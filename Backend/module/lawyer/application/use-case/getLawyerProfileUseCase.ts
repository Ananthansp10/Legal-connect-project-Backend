import { LawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";
import { BaseRepository } from "../../infrastructure/repository/baseRepository";
import { IGetLawyerProfileRepository } from "../../infrastructure/repositoryInterface/IGetLawyerProfileRepository";
import { IGetLawyerProfileUseCase } from "../use-case-interface/IGetLawyerProfileUseCase";



export class GetLawyerProfileUseCase  implements IGetLawyerProfileUseCase{

    constructor(
        private getLawyerProfileRepo:IGetLawyerProfileRepository
    ){}

    async execute(lawyerId: string): Promise<LawyerProfileEntity | null> {
        return await this.getLawyerProfileRepo.getLawyerProfile(lawyerId)
    }
}