import { UserProfileEntitie } from "../../domain/entity/userProfileUserEntity";
import { IUserProfileRepository } from "../../interface/repository/userProfileRepository";
import { userProfileModel } from "../models/userProfileModel";
import { BaseRepository } from "../mongoRepository/baseMongoRepository";



export class UserProfileRepository extends BaseRepository<UserProfileEntitie> implements IUserProfileRepository{

    constructor(){
        super(userProfileModel)
    }
}