import { UserProfileMapper } from "../../application/mapper/userProfileMapper";
import { UserProfileEntitie } from "../../domain/entity/userProfileUserEntity";
import { BaseMongoRepositorie } from "../../infrastructure/mongoRepositorie.ts/baseMongoRepositorie";


export interface IEditProfileRepositorie extends BaseMongoRepositorie<UserProfileEntitie>{
    editUserProfile(userId:string,data:UserProfileEntitie):Promise<UserProfileMapper>;
}