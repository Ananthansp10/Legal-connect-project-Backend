import { IHashService } from "../../infrastructure/services/IhashService";
import { IForgotPasswordRepository } from "../../infrastructure/repositoryInterface/IForgotPasswordRepository";
import { IChangePasswordUseCase } from "../use-case-Interface/IchangePasswordUseCase";


export class ChangePasswordUseCase implements IChangePasswordUseCase{

    constructor(private _forgotPasswordRepo:IForgotPasswordRepository,private _hashService:IHashService){}

   async changePassword(email: string, password: string): Promise<void> {

        let hashedPassword=await this._hashService.hash(password)
        
        await this._forgotPasswordRepo.updatePasswordByEmail(email,hashedPassword)
    }
}