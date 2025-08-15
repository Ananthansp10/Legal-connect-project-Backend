import { UserProfileMapper } from "../../application/mapper/userProfileMapper";
import { UserProfileEntitie } from "../../domain/entity/userProfileUserEntity";
import { IEditProfileRepository } from "../repositoryInterface/IEditProfileRepository";
import { userProfileModel } from "../models/userProfileModel";
import { BaseRepository } from "./baseRepository";


export class EditProfileRepository extends BaseRepository<UserProfileEntitie> implements IEditProfileRepository{

    constructor(){
        super(userProfileModel)
    }

   async editUserProfile(userId:string,data: UserProfileEntitie): Promise<UserProfileMapper> {
        return await userProfileModel.updateOne({userId:userId},{$set:data})
    }
}