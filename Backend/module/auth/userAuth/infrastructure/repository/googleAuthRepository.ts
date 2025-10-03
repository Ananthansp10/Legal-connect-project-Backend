import { IUserSignup } from "../../domain/userRegisterEntity";
import { IGoogleAuthRepository } from "../repositoryInterface/IGoogleAuthRepository";
import { userModel } from "../models/userSignupModel";
import { BaseRepository } from "./baseRepository";

export class GoogleAuthRepository
  extends BaseRepository<IUserSignup>
  implements IGoogleAuthRepository
{
  constructor() {
    super(userModel);
  }
}
