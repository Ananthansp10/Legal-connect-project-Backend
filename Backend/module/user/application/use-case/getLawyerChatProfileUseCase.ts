import { Types } from "mongoose";
import { LawyerChatProfileDto } from "../../domain/dtos/lawyerChatProfileDto";
import { IChatRepository } from "../../infrastructure/repositoryInterface/IChatRepository";
import { IGetLawyerChatProfileUseCase } from "../use-case-interface/IGetLawyerChatProfileUseCase";


export class GetLawyerChatProfileUseCase implements IGetLawyerChatProfileUseCase {

    constructor(
        private _chatRepo: IChatRepository
    ) { }

    async execute(lawyerId: Types.ObjectId): Promise<LawyerChatProfileDto | null> {
        const lawyerDetails = await this._chatRepo.findLawyerDetails(lawyerId)
        return {
            name: lawyerDetails?.personalInfo.name!,
            profileImage: lawyerDetails?.personalInfo.profileImage!,
            specialization: lawyerDetails?.proffessionalInfo.practiceAreas[0]!,
            courtName: lawyerDetails?.proffessionalInfo.courtName!
        }
    }
}