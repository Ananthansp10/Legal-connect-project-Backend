import { UserProfileEntitie } from "../../domain/entity/userProfileUserEntity";
import { IGetProfileRepositorie } from "../../interface/repositorie/getProfileRepositorie";
import { userProfileModel } from "../models/userProfileModel";
import { BaseMongoRepositorie } from "./baseMongoRepositorie";


export class GetProfileMogoRepositorie extends BaseMongoRepositorie<UserProfileEntitie> implements IGetProfileRepositorie{

    constructor(){
        super(userProfileModel)
    }

    async getProfile(userId: string): Promise<UserProfileEntitie | null> {
        return await userProfileModel.findOne({userId:userId})
    }
}