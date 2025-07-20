import { IUserSignup } from "../../domain/userRegisterEntity";
import { IUserSigninRepositorie } from "../../interface/repositories/signinRepositorie";
import { UserModel } from "../models/userSignupModel";
import { BaseMongoRepositorie } from "./baseMongoRepositorie";


export class UserSigninMongoRepositorie extends BaseMongoRepositorie<IUserSignup> implements IUserSigninRepositorie{

    constructor(){
        super(UserModel)
    }
}