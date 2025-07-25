import { UserProfileMapper } from "../mapper/userProfileMapper";


export interface IGetProfileApplication{
    execute(userId:string):Promise<UserProfileMapper | null>;
}