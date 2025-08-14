import { AppStatus } from "../../../../common/status/appStatus";
import { UserModel } from "../../../auth/userAuth/infrastructure/models/userSignupModel";
import { IUserSignup } from "../../domain/entity/userEntity";
import { IUserRepository } from "../repositoryInterface/IuserRepository";
import { BaseRepository } from "./baseRepository";


export class UserRepository extends BaseRepository<IUserSignup> implements IUserRepository{

    constructor(){
        super(UserModel)
    }

    async updateUserStatus(userId: string, status: string): Promise<void> {
        if(status==AppStatus.UNBLOCK){
            await UserModel.findByIdAndUpdate(userId,{$set:{isBlock:false}})
        }else{
            await UserModel.findByIdAndUpdate(userId,{$set:{isBlock:true}})
        }
    }
}