import { UserProfileEntitie } from "../../domain/entity/userProfileUserEntity";
import { IGetProfileRepository } from "../../interface/repository/getProfileRepository";
import { userProfileModel } from "../models/userProfileModel";
import { BaseRepository } from "../mongoRepository/baseMongoRepository";


export class GetProfileRepository extends BaseRepository<UserProfileEntitie> implements IGetProfileRepository{

    constructor(){
        super(userProfileModel)
    }

    async getProfile(userId: string): Promise<UserProfileEntitie | null> {
        return await userProfileModel.findOne({userId:userId})
    }
}