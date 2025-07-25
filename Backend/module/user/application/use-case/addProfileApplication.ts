import { UserProfileEntitie } from "../../domain/entity/userProfileUserEntity";
import { IUserProfileRepositorie } from "../../interface/repositorie/userProfileRepositorie";
import { IAddProfileApplication } from "../use-case-interface/IAddProfileApplication";
import { UserProfile, UserProfileMapper } from "../mapper/userProfileMapper";


export class AddProfileApplication implements IAddProfileApplication{

    constructor(
        private _userProfileRepo:IUserProfileRepositorie
    ){}

    async execute(data:UserProfile , imageUrl: string): Promise<void> {
        try {
            
           let profileData:UserProfileEntitie=UserProfileMapper.toRequest(data,imageUrl)
           await this._userProfileRepo.create(profileData)
        } catch (error) {
            throw error
        }

    }
}