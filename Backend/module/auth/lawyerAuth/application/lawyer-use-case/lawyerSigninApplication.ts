import { AppError } from "../../../../../common/error/AppEnumError";
import { AppException } from "../../../../../common/error/errorException";
import { AppStatusCode } from "../../../../../common/statusCode/AppStatusCode";
import { ITokenGeneration } from "../../../userAuth/infrastructure/services/ItokenGenerationService";
import { LawyerSigninResponseDto } from "../../domain/dto/lawyerSigninDto";
import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import { ILawyerSigninRepositorie } from "../../interface/repositories/lawyerSigninRepositorie";
import { ILawyerSigninApplication } from "../lawyer-use-case-interface/IlawyerSigninApplication";
import { LawyerSigninMapper as mapper } from "../mapper/lawyerSigninMapper";
import bcrypt from 'bcrypt'

export class LawyerSigninApplication implements ILawyerSigninApplication{

    constructor(
        private _lawyerRepo:ILawyerSigninRepositorie,
        private _tokenGenerateService:ITokenGeneration
    ){}

   async execute(email: string, password: string): Promise<LawyerSigninResponseDto> {

        let lawyerExist:ILawyerSignup | null=await this._lawyerRepo.findByEmail(email)

        if(!lawyerExist){
            throw new AppException(AppError.USER_NOT_FOUND,AppStatusCode.NOT_FOUND)
        }

        if(lawyerExist && lawyerExist.isBlock){
            throw new AppException(AppError.ACCOUNT_BLOCKED,AppStatusCode.ACCOUNT_BLOCKED)
        }

        if(lawyerExist && !lawyerExist.verified){
            throw new AppException("Account Not verified",503)
        }

        let isPasswordMatch=await bcrypt.compare(password,lawyerExist.password)

        if(!isPasswordMatch){
            throw new AppException(AppError.INVALID_PASSWORD,401)
        }

        let accessToken:string=this._tokenGenerateService.generateAccessToken({id:lawyerExist._id,role:'lawyer'})
        let refreshToken:string=this._tokenGenerateService.generateRefreshToken({id:lawyerExist._id,role:'lawyer'})

        let response:LawyerSigninResponseDto=mapper.toResponse(lawyerExist,accessToken,refreshToken)

        return response

    }
}