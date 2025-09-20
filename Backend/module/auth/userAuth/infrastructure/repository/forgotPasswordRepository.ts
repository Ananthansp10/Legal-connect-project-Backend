import { IForgotPasswordRepository } from "../repositoryInterface/IForgotPasswordRepository";
import { UserModel } from "../models/userSignupModel";


export class ForgotPasswordRepository implements IForgotPasswordRepository {

    async updatePasswordByEmail(email: string, password: string): Promise<void> {
        await UserModel.updateOne({ email: email }, { $set: { password: password } })
    }
}