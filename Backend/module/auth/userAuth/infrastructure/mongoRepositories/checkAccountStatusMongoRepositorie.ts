import { IUserSignup } from "../../domain/userRegisterEntity";
import { ICheckAccoutStatus } from "../../interface/repositories/checkAccountStatusRepositorie";
import { UserModel } from "../models/userSignupModel";
import { BaseMongoRepositorie } from "./baseMongoRepositorie";


export class CheckAccountStatusMongoRepositorie extends BaseMongoRepositorie<IUserSignup> implements ICheckAccoutStatus{

    constructor(){
        super(UserModel)
    }
}