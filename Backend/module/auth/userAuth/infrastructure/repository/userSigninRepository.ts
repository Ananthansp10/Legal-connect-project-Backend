import { IUserSignup } from "../../domain/userRegisterEntity";
import { IUserSigninRepository } from "../repositoryInterface/ISigninRepository";
import { UserModel } from "../models/userSignupModel";
import { BaseRepository } from "./baseRepository";


export class UserSigninRepository extends BaseRepository<IUserSignup> implements IUserSigninRepository{

    constructor(){
        super(UserModel)
    }
}