import { IUserSignup } from "../../domain/userRegisterEntity";
import { IUserSignupRepositorie } from "../../interface/repositories/userSignupRepositorie";
import { BaseMongoRepositorie } from "./baseMongoRepositorie";
import { UserModel } from "../models/userSignupModel";

export class UserSignupMongoRepositorie extends BaseMongoRepositorie<IUserSignup> implements IUserSignupRepositorie{

    constructor(){
        super(UserModel)
    }

    async updateUserToActive(email: string): Promise<void> {
        await UserModel.updateOne({email:email},{$set:{isActive:true}})
    }

}