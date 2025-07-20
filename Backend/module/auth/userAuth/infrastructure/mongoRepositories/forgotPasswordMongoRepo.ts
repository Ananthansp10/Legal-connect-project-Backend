import { IForgotPasswordRepo } from "../../interface/repositories/forgotPasswordRepositories";
import { UserModel } from "../models/userSignupModel";


export class ForgotPasswordMongoRepo implements IForgotPasswordRepo{

    async updatePasswordByEmail(email: string, password: string): Promise<void> {
        await UserModel.updateOne({email:email},{$set:{password:password}})
    }
}