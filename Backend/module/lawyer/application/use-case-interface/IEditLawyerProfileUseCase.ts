import { LawyerEditProfileRequest } from "../mapper/lawyerEditProfileMapper";



export interface IEditLawyerProfileUseCase {
    execute(data: LawyerEditProfileRequest, imageUrl: string): Promise<void>;
}