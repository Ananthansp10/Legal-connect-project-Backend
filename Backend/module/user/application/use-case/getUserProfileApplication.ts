import { UserProfileEntitie } from "../../domain/entity/userProfileUserEntity";
import { IGetProfileRepositorie } from "../../interface/repositorie/getProfileRepositorie";
import { UserProfileMapper } from "../mapper/userProfileMapper";
import { IGetProfileApplication } from "../use-case-interface/IGetProfileApplication";


export class GetUserProfileApplication implements IGetProfileApplication{

    constructor(
        private _getProfileRepo:IGetProfileRepositorie
    ){}

    async execute(userId: string): Promise<UserProfileMapper | null> {

        let userProfile:UserProfileEntitie | null=await this._getProfileRepo.getProfile(userId)
        console.log(userProfile)

        return userProfile ? userProfile : null
    }
}