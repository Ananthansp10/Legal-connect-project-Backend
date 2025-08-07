import { UserProfileMapper } from "../../application/mapper/userProfileMapper";
import { UserProfileEntitie } from "../../domain/entity/userProfileUserEntity";
import { IEditProfileRepository } from "../../interface/repository/editProfileRepository";
import { userProfileModel } from "../models/userProfileModel";
import { BaseRepository } from "../mongoRepository/baseMongoRepository";


export class EditProfileRepository extends BaseRepository<UserProfileEntitie> implements IEditProfileRepository{

    constructor(){
        super(userProfileModel)
    }

   async editUserProfile(userId:string,data: UserProfileEntitie): Promise<UserProfileMapper> {
        return await userProfileModel.updateOne({userId:userId},{$set:data})
    }
}