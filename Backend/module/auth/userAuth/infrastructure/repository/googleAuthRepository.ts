import { IUserSignup } from "../../domain/userRegisterEntity";
import { IGoogleAuthRepository } from "../repositoryInterface/IGoogleAuthRepository";
import { UserModel } from "../models/userSignupModel";
import { BaseRepository } from "./baseRepository";


export class GoogleAuthRepository extends BaseRepository<IUserSignup> implements IGoogleAuthRepository {

    constructor() {
        super(UserModel)
    }
}