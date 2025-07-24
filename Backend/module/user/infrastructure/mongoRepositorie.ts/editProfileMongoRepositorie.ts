import { UserProfileMapper } from "../../application/mapper/userProfileMapper";
import { UserProfileEntitie } from "../../domain/entity/userProfileUserEntity";
import { IEditProfileRepositorie } from "../../interface/repositorie/editProfileRepositorie";
import { userProfileModel } from "../models/userProfileModel";
import { BaseMongoRepositorie } from "./baseMongoRepositorie";


export class EditProfileMongoRepositorie extends BaseMongoRepositorie<UserProfileEntitie> implements IEditProfileRepositorie{

    constructor(){
        super(userProfileModel)
    }

   async editUserProfile(userId:string,data: UserProfileEntitie): Promise<UserProfileMapper> {
        return await userProfileModel.updateOne({userId:userId},{$set:data})
    }
}