import { AppError } from "../../../../../common/error/AppEnumError";
import { AppException } from "../../../../../common/error/errorException";
import { AppStatusCode } from "../../../../../common/statusCode/AppStatusCode";
import { IHashService } from "../../../userAuth/infrastructure/services/IhashService";
import { IChangePasswordRepositorie } from "../../interface/repositories/IchangePasswordRepositorie";
import { ILawyerResetPasswordApplication } from "../lawyer-use-case-interface/IlawyerResetPasswordApplication";
import bcrypt from 'bcrypt'

export class LawyerResetPasswordApplication implements ILawyerResetPasswordApplication{

    constructor(
        private _changePasswordRepo:IChangePasswordRepositorie,
        private _hashPasswordService:IHashService
    ){}

    async resetPassword(email: string, oldPassword: string, newPassword: string): Promise<void> {
        
        let emailExist=await this._changePasswordRepo.findByEmail(email)

        if(!emailExist){
            throw new AppException(AppError.USER_NOT_FOUND,AppStatusCode.NOT_FOUND)
        }

        let isPasswordMatch=await bcrypt.compare(oldPassword,emailExist.password)

        if(!isPasswordMatch){
            throw new AppException(AppError.OLD_PASSWORD_WRONG,AppStatusCode.UNAUTHORIZED)
        }

        let hashedPassword:string=await this._hashPasswordService.hash(newPassword)

        await this._changePasswordRepo.changePassword(email,hashedPassword)
    }
}