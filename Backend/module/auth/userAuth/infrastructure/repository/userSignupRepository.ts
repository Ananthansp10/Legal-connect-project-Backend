import { IUserSignup } from "../../domain/userRegisterEntity";
import { IUserSignupRepository } from "../repositoryInterface/IUserSignupRepository";
import { BaseRepository } from "./baseRepository";
import { UserModel } from "../models/userSignupModel";

export class UserSignupRepository extends BaseRepository<IUserSignup> implements IUserSignupRepository {

    constructor() {
        super(UserModel)
    }

    async updateUserToActive(email: string): Promise<void> {
        await UserModel.updateOne({ email: email }, { $set: { isActive: true } })
    }

}