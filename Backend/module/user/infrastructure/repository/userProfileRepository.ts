import { UserProfileEntitie } from "../../domain/entity/userProfileUserEntity";
import { IUserProfileRepository } from "../repositoryInterface/userProfileRepository";
import { userProfileModel } from "../models/userProfileModel";
import { BaseRepository } from "./baseRepository";



export class UserProfileRepository extends BaseRepository<UserProfileEntitie> implements IUserProfileRepository{

    constructor(){
        super(userProfileModel)
    }
}