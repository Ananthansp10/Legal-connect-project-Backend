import { IUserSignup } from "../../domain/userRegisterEntity";
import { IResetPasswordRepository } from "../repositoryInterface/IResetPasswordRepository";
import { UserModel } from "../models/userSignupModel";
import { BaseRepository } from "./baseRepository";


export class ResetPasswordRepository extends BaseRepository<IUserSignup> implements IResetPasswordRepository{

    constructor(){
        super(UserModel)
    }
    async changePassword(email: string, password: string): Promise<void> {
        await UserModel.updateOne({email:email},{$set:{password:password}})
    }
}