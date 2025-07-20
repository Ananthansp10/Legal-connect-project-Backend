import { IUserSignup } from "../../domain/userRegisterEntity";
import { ITokenGeneration } from "../../infrastructure/services/ItokenGenerationService";
import { IUserSigninRepositorie } from "../../interface/repositories/signinRepositorie";
import { AppError } from "../error/AppEnumError";
import { AppException } from "../error/errorException";
import { IUserSigninApplication } from "../use-case-Interface/IUserSigninApplication";
import bcrypt from 'bcrypt'
import { UserSigninMapper as mapper } from "../mapper/userSigninMapper";
import { UserSigninDto } from "../../domain/dto/userSigninDto";

export class UserSigninApplication implements IUserSigninApplication{

    constructor(
        private _userSigninRepo:IUserSigninRepositorie,
        private _tokenGenerationService:ITokenGeneration
    ){}

    async execute(email: string, password: string): Promise<UserSigninDto> {
        
        let userExist:IUserSignup | null=await this._userSigninRepo.findByEmail(email)
        
        if(!userExist){
            throw new AppException(AppError.USER_NOT_FOUND,404)
        }

        if(userExist.isBlock){
            throw new AppException(AppError.ACCOUNT_BLOCKED,403)
        }

        let isPasswordMatch=await bcrypt.compare(password,userExist.password!)

        if(!isPasswordMatch){
            throw new AppException(AppError.INVALID_PASSWORD,401)
        }

        let accessToken=this._tokenGenerationService.generateAccessToken({id:userExist._id,role:'user'})
        let refreshToken=this._tokenGenerationService.generateRefreshToken({id:userExist._id,role:'user'})

        let response:UserSigninDto=mapper.toResponse(userExist,accessToken,refreshToken)

        return response
    }
}