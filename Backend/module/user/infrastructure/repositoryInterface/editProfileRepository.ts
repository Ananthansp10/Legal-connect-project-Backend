import { UserProfileMapper } from "../../application/mapper/userProfileMapper";
import { UserProfileEntitie } from "../../domain/entity/userProfileUserEntity";
import { BaseRepository } from "../repository/baseRepository";


export interface IEditProfileRepository extends BaseRepository<UserProfileEntitie>{
    editUserProfile(userId:string,data:UserProfileEntitie):Promise<UserProfileMapper>;
}