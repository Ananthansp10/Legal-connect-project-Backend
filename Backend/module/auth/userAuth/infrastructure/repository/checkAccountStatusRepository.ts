import { IUserSignup } from "../../domain/userRegisterEntity";
import { ICheckAccoutStatusRepository } from "../repositoryInterface/ICheckAccountStatusRepository";
import { UserModel } from "../models/userSignupModel";
import { BaseRepository } from "./baseRepository";


export class CheckAccountStatusRepository extends BaseRepository<IUserSignup> implements ICheckAccoutStatusRepository {

    constructor() {
        super(UserModel)
    }
}