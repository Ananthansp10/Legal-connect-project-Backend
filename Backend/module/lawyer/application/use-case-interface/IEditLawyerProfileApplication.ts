import { LawyerEditProfileRequest } from "../mapper/lawyerEditProfileMapper";



export interface IEditLawyerProfileApplication{
    execute(data:LawyerEditProfileRequest,imageUrl:string):Promise<void>;
}