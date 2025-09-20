import { UserSignupRequestDto, UserSignupResponseDto } from "../../domain/dto/userSignupDto";
import { IUserSignup } from "../../domain/userRegisterEntity";
import { IGenerateOtpService } from "../../infrastructure/services/IgenerateOtpService";
import { IHashService } from "../../infrastructure/services/IhashService";
import { IOtpService } from "../../infrastructure/services/IsaveOtp";
import { ISendOtpMailService } from "../../infrastructure/services/IsendOtpMailService";
import { IUserSignupRepository } from "../../infrastructure/repositoryInterface/IUserSignupRepository";
import { AppError } from "../../../../../common/error/AppEnumError";
import { AppException } from "../../../../../common/error/errorException";
import { UserSignupMapper as userSignupMapper } from "../mapper/userSignupMapper";
import { IUserSignupUseCase } from "../use-case-Interface/IUserSignupUseCase";
import { AppStatusCode } from "../../../../../common/statusCode/AppStatusCode";

export class UserSignupUseCase implements IUserSignupUseCase {

    private _userRepo: IUserSignupRepository
    private _sendEmail: ISendOtpMailService
    private _generateOtp: IGenerateOtpService
    private _hashPassword: IHashService
    private _otpAction: IOtpService
    private _hashOtp: IHashService

    constructor(userRepo: IUserSignupRepository, otpEmailService: ISendOtpMailService, generateOtpSrvice: IGenerateOtpService, hashService: IHashService, otpService: IOtpService) {
        this._userRepo = userRepo
        this._sendEmail = otpEmailService
        this._generateOtp = generateOtpSrvice
        this._hashPassword = hashService
        this._otpAction = otpService
        this._hashOtp = hashService
    }

    async registerUser(data: UserSignupRequestDto): Promise<UserSignupResponseDto | null> {
        try {
            const userExist: IUserSignup | null = await this._userRepo.findByEmail(data.email)
            if (userExist) {
                throw new AppException(AppError.USER_ALREADY_EXISTS, AppStatusCode.CONFLICT)
            } else {

                const user = userSignupMapper.toRequest(data)

                const otp = this._generateOtp.generateOtp()

                const hashedPassword = await this._hashPassword.hash(user.password!)

                const hashedOtp = await this._hashOtp.hash(otp)

                await this._otpAction.saveOtp(user.email, hashedOtp)

                this._sendEmail.sendOtpMail(user.email, otp)

                setTimeout(() => {
                    this._otpAction.deleteOtp(user.email)
                }, 60000 * 2)

                const newUser = { ...user, password: hashedPassword }

                const userObj = await this._userRepo.create(newUser)

                return userSignupMapper.toResponse(userObj!)
            }
        } catch (error) {
            throw error;
        }
    }
}