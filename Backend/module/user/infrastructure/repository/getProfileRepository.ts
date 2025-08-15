import { UserProfileEntitie } from "../../domain/entity/userProfileUserEntity";
import { IGetProfileRepository } from "../repositoryInterface/IGetProfileRepository";
import { userProfileModel } from "../models/userProfileModel";
import { BaseRepository } from "./baseRepository";


export class GetProfileRepository extends BaseRepository<UserProfileEntitie> implements IGetProfileRepository{

    constructor(){
        super(userProfileModel)
    }

    async getProfile(userId: string): Promise<UserProfileEntitie | null> {
        return await userProfileModel.findOne({userId:userId})
    }
}