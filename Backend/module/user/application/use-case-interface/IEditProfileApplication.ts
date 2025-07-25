import { UserProfile, UserProfileMapper } from "../mapper/userProfileMapper";


export interface IEditProfileApplication{
    execute(userId:string,data:UserProfile,imageUrl:string):Promise<UserProfileMapper>;
}