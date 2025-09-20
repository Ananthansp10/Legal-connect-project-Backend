import { IUserSignup } from "../../domain/userRegisterEntity";
import { ITokenGeneration } from "../../infrastructure/services/ItokenGenerationService";
import { IUserSigninRepository } from "../../infrastructure/repositoryInterface/ISigninRepository";
import { AppError } from "../../../../../common/error/AppEnumError";
import { AppException } from "../../../../../common/error/errorException";
import { IUserSigninUseCase } from "../use-case-Interface/IUserSigninUseCase";
import bcrypt from 'bcrypt'
import { UserSigninMapper as mapper } from "../mapper/userSigninMapper";
import { UserSigninDto } from "../../domain/dto/userSigninDto";
import { AppStatusCode } from "../../../../../common/statusCode/AppStatusCode";

export class UserSigninUseCase implements IUserSigninUseCase {

    constructor(
        private _userSigninRepo: IUserSigninRepository,
        private _tokenGenerationService: ITokenGeneration
    ) { }

    async execute(email: string, password: string): Promise<UserSigninDto> {

        const userExist: IUserSignup | null = await this._userSigninRepo.findByEmail(email)

        if (!userExist) {
            throw new AppException(AppError.USER_NOT_FOUND, AppStatusCode.NOT_FOUND)
        }

        if (userExist.isBlock) {
            throw new AppException(AppError.ACCOUNT_BLOCKED, AppStatusCode.ACCOUNT_BLOCKED)
        }

        const isPasswordMatch = await bcrypt.compare(password, userExist.password!)

        if (!isPasswordMatch) {
            throw new AppException(AppError.INVALID_PASSWORD, AppStatusCode.UNAUTHORIZED)
        }

        const accessToken = this._tokenGenerationService.generateAccessToken({ id: userExist._id, role: 'user' })
        const refreshToken = this._tokenGenerationService.generateRefreshToken({ id: userExist._id, role: 'user' })

        const response: UserSigninDto = mapper.toResponse(userExist, accessToken, refreshToken)

        return response
    }
}