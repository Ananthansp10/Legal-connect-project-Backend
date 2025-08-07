import { UserSigninDto } from "../../domain/dto/userSigninDto";
import { ITokenGeneration } from "../../infrastructure/services/ItokenGenerationService";
import { IGoogleAuthRepositorie } from "../../interface/repositories/googleAuthRepositorie";
import { IGoogleAuthApplication } from "../use-case-Interface/IgoogleAuthApplication";
import { UserSigninMapper as mapper } from "../mapper/userSigninMapper";
import { GoogleAuthEntity } from "../../domain/googleAuthEntity";
import { AppException } from "../../../../../common/error/errorException";
import { AppError } from "../../../../../common/error/AppEnumError";
import { IUserSignup } from "../../domain/userRegisterEntity";
import { AppStatusCode } from "../../../../../common/statusCode/AppStatusCode";

export class GoogleAuthApplication implements IGoogleAuthApplication{
    
    constructor(
        private _googleAuthRepo:IGoogleAuthRepositorie,
        private _tokenGenerateService:ITokenGeneration,
    ){}

    async execute(data: GoogleAuthEntity): Promise<UserSigninDto> {
        try {
            let userExist=await this._googleAuthRepo.findByEmail(data.email)

            if(userExist?.isBlock){
                throw new AppException(AppError.ACCOUNT_BLOCKED,AppStatusCode.ACCOUNT_BLOCKED)
            }

            if(userExist && !userExist.googleId){
                throw new AppException(AppError.USER_ALREADY_EXISTS,AppStatusCode.CONFLICT)
            }

            if(!userExist){

                let userObj:IUserSignup={
                    name:data.name,
                    email:data.email,
                    googleId:data.googleId,
                    isActive:true,
                    isBlock:false
                }

                let user:IUserSignup | null=await this._googleAuthRepo.create(userObj)
                let accessToken:string=this._tokenGenerateService.generateAccessToken({id:user?._id,role:'user'})
                let refreshToken:string=this._tokenGenerateService.generateRefreshToken({id:user,role:'user'})

                let response:UserSigninDto=mapper.toResponse(user!,accessToken,refreshToken)

                return response
            }

            let accessToken:string=this._tokenGenerateService.generateAccessToken({id:userExist._id,role:'user'})
            let refreshToken:string=this._tokenGenerateService.generateRefreshToken({id:userExist._id,role:'user'})

            let response:UserSigninDto=mapper.toResponse(userExist,accessToken,refreshToken)

            return response


        } catch (error) {
            throw error
        }
    }
}