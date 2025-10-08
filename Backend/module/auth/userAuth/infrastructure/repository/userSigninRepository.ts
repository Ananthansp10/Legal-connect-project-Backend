import { IUserSignup } from "../../domain/userRegisterEntity";
import { IUserSigninRepository } from "../repositoryInterface/ISigninRepository";
import { userModel } from "../models/userSignupModel";
import { BaseRepository } from "./baseRepository";

export class UserSigninRepository
  extends BaseRepository<IUserSignup>
  implements IUserSigninRepository
{
  constructor() {
    super(userModel);
  }
}
