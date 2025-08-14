import { IEditLawyerProfileRepository } from "../../infrastructure/repositoryInterface/IEditLawyerProfileRepository";
import { LawyerEditProfileRequest, LawyerEditProfileResponse } from "../mapper/lawyerEditProfileMapper";
import { IEditLawyerProfileUseCase } from "../use-case-interface/IEditLawyerProfileUseCase";
import { EditLawyerProfileMapper } from "../mapper/lawyerEditProfileMapper";


export class LawyerEditProfileUseCase implements IEditLawyerProfileUseCase{

    constructor(
        private editLawyerProfileRepo:IEditLawyerProfileRepository
    ){}

    async execute(data: LawyerEditProfileRequest,imageUrl:string): Promise<void> {
        
        let editedData:LawyerEditProfileResponse=await EditLawyerProfileMapper.toResponse(data,imageUrl)

        await this.editLawyerProfileRepo.editLawyerProfile(data.lawyerId,editedData)

    }
}