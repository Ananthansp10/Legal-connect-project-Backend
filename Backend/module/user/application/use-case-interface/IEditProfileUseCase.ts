import { UserProfile, UserProfileMapper } from "../mapper/userProfileMapper";


export interface IEditProfileUseCase{
    execute(userId:string,data:UserProfile,imageUrl:string):Promise<UserProfileMapper>;
}