import { AppStatus } from "../../../../common/status/appStatus";
import { UserModel } from "../../../auth/userAuth/infrastructure/models/userSignupModel";
import { IUserSignup } from "../../domain/entity/userEntity";
import { IUserRepositorie } from "../../interface/repositories/IuserRepositorie";
import { BaseMongoRepositorie } from "./baseRepositories";


export class UserMongoRepositorie extends BaseMongoRepositorie<IUserSignup> implements IUserRepositorie{

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