import { UserProfileEntitie } from "../../domain/entity/userProfileUserEntity";
import { IUserProfileRepositorie } from "../../interface/repositorie/userProfileRepositorie";
import { userProfileModel } from "../models/userProfileModel";
import { BaseMongoRepositorie } from "./baseMongoRepositorie";



export class UserProfileMongoRepositorie extends BaseMongoRepositorie<UserProfileEntitie> implements IUserProfileRepositorie{

    constructor(){
        super(userProfileModel)
    }
}