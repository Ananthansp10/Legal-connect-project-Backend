import { UserProfileEntitie } from "../../domain/entity/userProfileUserEntity";
import { IBaseRepositorie } from "./IbaseRepositorie";


export interface IGetProfileRepositorie extends IBaseRepositorie<UserProfileEntitie>{
    getProfile(userId:string):Promise<UserProfileEntitie | null>
}