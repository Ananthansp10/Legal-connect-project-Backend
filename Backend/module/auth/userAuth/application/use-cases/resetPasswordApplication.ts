import { IUserSignup } from "../../domain/userRegisterEntity";
import { IHashService } from "../../infrastructure/services/IhashService";
import { IResetPassword } from "../../interface/repositories/resetPasswordRepositorie";
import { AppError } from "../error/AppEnumError";
import { AppException } from "../error/errorException";
import { IResetPasswordApplication } from "../use-case-Interface/IresetPasswordApplication";
import bcrypt from 'bcrypt'

export class ResetPasswordApplication implements IResetPasswordApplication{

    constructor(private _resetPasswordRepo:IResetPassword,private _hashService:IHashService){}

   async execute(email: string, oldPassword: string, newPassword: string): Promise<void> {
        
        let userExist:IUserSignup | null=await this._resetPasswordRepo.findByEmail(email)

        if(!userExist){
            throw new AppException(AppError.USER_NOT_FOUND,404)
        }

        let isPasswordMatch=await bcrypt.compare(oldPassword,userExist.password!)

        if(!isPasswordMatch){
            throw new AppException(AppError.OLD_PASSWORD_WRONG,401)
        }

        let newHashhedPassword=await this._hashService.hash(newPassword)

        await this._resetPasswordRepo.changePassword(email,newHashhedPassword)

    }
}