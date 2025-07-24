import { UserProfile } from "../mapper/userProfileMapper";


export interface IAddProfileApplication{
    execute(data:UserProfile,imageUrl:string):Promise<void>;
}