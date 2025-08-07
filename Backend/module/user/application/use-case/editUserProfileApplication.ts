import { IEditProfileRepository } from "../../interface/repository/editProfileRepository";
import { UserProfile, UserProfileMapper } from "../mapper/userProfileMapper";
import { IEditProfileApplication } from "../use-case-interface/IEditProfileApplication";

export class EditUserProfileApplication implements IEditProfileApplication{

    constructor(
        private _editProfileRepo:IEditProfileRepository
    ){}

    async execute(userId: string, data: UserProfile,imageUrl:string): Promise<UserProfileMapper> {

        let editedProfileData=UserProfileMapper.toRequest(data,imageUrl)
        
        return this._editProfileRepo.editUserProfile(userId,editedProfileData)
    }
}