import { UserProfileEntitie } from "../../domain/entity/userProfileUserEntity";
import { IUserProfileRepository } from "../../infrastructure/repositoryInterface/IUserProfileRepository";
import { IAddProfileUseCase } from "../use-case-interface/IAddProfileUseCase";
import { UserProfile, UserProfileMapper } from "../mapper/userProfileMapper";


export class AddProfileUseCase implements IAddProfileUseCase{

    constructor(
        private _userProfileRepo:IUserProfileRepository
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