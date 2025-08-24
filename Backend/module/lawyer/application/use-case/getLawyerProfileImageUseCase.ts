import { Types } from "mongoose";
import { IGetLawyerProfileRepository } from "../../infrastructure/repositoryInterface/IGetLawyerProfileRepository";
import { IGetLawyerProfileImageUseCase } from "../use-case-interface/IGetLawyerProfileImageUseCase";


export class GetLawyerProfileImageUseCase implements IGetLawyerProfileImageUseCase {

    constructor(
        private getLawyerProfileRepo:IGetLawyerProfileRepository
    ){}

    async execute(lawyerId: Types.ObjectId): Promise<string | null> {
        return await this.getLawyerProfileRepo.getLawyerProfileImage(lawyerId)
    }
}