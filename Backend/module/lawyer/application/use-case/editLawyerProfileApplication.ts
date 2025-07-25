import { IEditLawyerProfileRepositorie } from "../../interface/repositorie/editLawyerProfileRepositorie";
import { LawyerEditProfileRequest, LawyerEditProfileResponse } from "../mapper/lawyerEditProfileMapper";
import { IEditLawyerProfileApplication } from "../use-case-interface/IEditLawyerProfileApplication";
import { EditLawyerProfileMapper } from "../mapper/lawyerEditProfileMapper";


export class LawyerEditProfileApplication implements IEditLawyerProfileApplication{

    constructor(
        private editLawyerProfileRepo:IEditLawyerProfileRepositorie
    ){}

    async execute(data: LawyerEditProfileRequest,imageUrl:string): Promise<void> {
        
        let editedData:LawyerEditProfileResponse=await EditLawyerProfileMapper.toResponse(data,imageUrl)

        await this.editLawyerProfileRepo.editLawyerProfile(data.lawyerId,editedData)

    }
}