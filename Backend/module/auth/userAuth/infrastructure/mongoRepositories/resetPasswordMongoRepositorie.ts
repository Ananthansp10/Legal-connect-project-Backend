import { IUserSignup } from "../../domain/userRegisterEntity";
import { IResetPassword } from "../../interface/repositories/resetPasswordRepositorie";
import { UserModel } from "../models/userSignupModel";
import { BaseMongoRepositorie } from "./baseMongoRepositorie";


export class ResetPasswordMongoRepositorie extends BaseMongoRepositorie<IUserSignup> implements IResetPassword{

    constructor(){
        super(UserModel)
    }
    async changePassword(email: string, password: string): Promise<void> {
        await UserModel.updateOne({email:email},{$set:{password:password}})
    }
}