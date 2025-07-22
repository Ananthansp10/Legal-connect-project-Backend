import { AppError } from "../../../userAuth/application/error/AppEnumError";
import { AppException } from "../../../userAuth/application/error/errorException";
import { IHashService } from "../../../userAuth/infrastructure/services/IhashService";
import { IChangePasswordRepositorie } from "../../interface/repositories/IchangePasswordRepositorie";
import { ILawyerChangePasswordApplication } from "../lawyer-use-case-interface/IlawyerChangePasswordApplication";
import jwt from 'jsonwebtoken'

export class LawyerChangePasswordApplication implements ILawyerChangePasswordApplication{

    constructor(
        private _changePasswordRepo:IChangePasswordRepositorie,
        private _hashService:IHashService
    ){}

    async changePassword(email: string, password: string, token: string): Promise<void> {
        try {
            console.log(email,password,token)
            let decodeToken:any=jwt.decode(token)

            if(Date.now()>decodeToken?.exp*1000){
                throw new AppException("Link has Expired try again")
            }

            let hashedPassword:string=await this._hashService.hash(password)

            await this._changePasswordRepo.changePassword(email,hashedPassword)

        } catch (error) {
            throw error
        }
    }
}