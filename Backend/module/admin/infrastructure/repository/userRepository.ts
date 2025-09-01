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

    async searchUser(name: string): Promise<IUserSignup[] | null> {
        return await UserModel.find({name: { $regex: new RegExp(name, "i") }})
    }

    async filterUser(status: string): Promise<IUserSignup[] | null> {
        return await UserModel.find(status == 'unblock' ? {isBlock:false} : status == 'block' ? {isBlock:true} : {})
    }
}