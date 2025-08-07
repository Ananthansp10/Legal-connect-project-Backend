import { UserProfileMapper } from "../../application/mapper/userProfileMapper";
import { UserProfileEntitie } from "../../domain/entity/userProfileUserEntity";
import { BaseRepository } from "../../infrastructure/mongoRepository/baseMongoRepository";


export interface IEditProfileRepository extends BaseRepository<UserProfileEntitie>{
    editUserProfile(userId:string,data:UserProfileEntitie):Promise<UserProfileMapper>;
}