import { IHashService } from "../../infrastructure/services/IhashService";
import { IForgotPasswordRepo } from "../../interface/repositories/forgotPasswordRepositories";
import { IChangePasswordApplication } from "../use-case-Interface/IchangePasswordApplication";


export class ChangePassword implements IChangePasswordApplication{

    constructor(private _forgotPasswordRepo:IForgotPasswordRepo,private _hashService:IHashService){}

   async changePassword(email: string, password: string): Promise<void> {

        let hashedPassword=await this._hashService.hash(password)
        
        await this._forgotPasswordRepo.updatePasswordByEmail(email,hashedPassword)
    }
}