import { IUserSignup } from "../../domain/userRegisterEntity";
import { IGoogleAuthRepositorie } from "../../interface/repositories/googleAuthRepositorie";
import { UserModel } from "../models/userSignupModel";
import { BaseMongoRepositorie } from "./baseMongoRepositorie";


export class GoogleAuthMongoRepo extends BaseMongoRepositorie<IUserSignup> implements IGoogleAuthRepositorie{

    constructor(){
        super(UserModel)
    }
}