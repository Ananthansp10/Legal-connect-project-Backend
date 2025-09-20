import { UserSigninDto } from "../../domain/dto/userSigninDto";
import { ITokenGeneration } from "../../infrastructure/services/ItokenGenerationService";
import { IGoogleAuthRepository } from "../../infrastructure/repositoryInterface/IGoogleAuthRepository";
import { IGoogleAuthUseCase } from "../use-case-Interface/IgoogleAuthUseCase";
import { UserSigninMapper as mapper } from "../mapper/userSigninMapper";
import { AppException } from "../../../../../common/error/errorException";
import { AppError } from "../../../../../common/error/AppEnumError";
import { IUserSignup } from "../../domain/userRegisterEntity";
import { AppStatusCode } from "../../../../../common/statusCode/AppStatusCode";
import { GoogleAuthRequestDto } from "../../domain/dto/googleAuthDto";

export class GoogleAuthUseCase implements IGoogleAuthUseCase {

    constructor(
        private _googleAuthRepo: IGoogleAuthRepository,
        private _tokenGenerateService: ITokenGeneration,
    ) { }

    async execute(data: GoogleAuthRequestDto): Promise<UserSigninDto> {
        try {
            const userExist = await this._googleAuthRepo.findByEmail(data.email)

            if (userExist?.isBlock) {
                throw new AppException(AppError.ACCOUNT_BLOCKED, AppStatusCode.ACCOUNT_BLOCKED)
            }

            if (userExist && !userExist.googleId) {
                throw new AppException(AppError.USER_ALREADY_EXISTS, AppStatusCode.CONFLICT)
            }

            if (!userExist) {

                let userObj: IUserSignup = {
                    name: data.name,
                    email: data.email,
                    googleId: data.googleId,
                    isActive: true,
                    isBlock: false
                }

                const user: IUserSignup | null = await this._googleAuthRepo.create(userObj)
                const accessToken: string = this._tokenGenerateService.generateAccessToken({ id: user?._id, role: 'user' })
                const refreshToken: string = this._tokenGenerateService.generateRefreshToken({ id: user, role: 'user' })

                const response: UserSigninDto = mapper.toResponse(user!, accessToken, refreshToken)

                return response
            }

            const accessToken: string = this._tokenGenerateService.generateAccessToken({ id: userExist._id, role: 'user' })
            const refreshToken: string = this._tokenGenerateService.generateRefreshToken({ id: userExist._id, role: 'user' })

            const response: UserSigninDto = mapper.toResponse(userExist, accessToken, refreshToken)

            return response


        } catch (error) {
            throw error
        }
    }
}