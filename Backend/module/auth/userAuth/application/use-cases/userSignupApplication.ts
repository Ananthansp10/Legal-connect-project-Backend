import { UserSignupRequestDto, UserSignupResponseDto } from "../../domain/dto/userSignupDto";
import { IUserSignup } from "../../domain/userRegisterEntity";
import { IGenerateOtpService } from "../../infrastructure/services/IgenerateOtpService";
import { IHashService } from "../../infrastructure/services/IhashService";
import { IOtpService } from "../../infrastructure/services/IsaveOtp";
import { ISendOtpMailService } from "../../infrastructure/services/IsendOtpMailService";
import { IUserSignupRepositorie } from "../../interface/repositories/userSignupRepositorie";
import { AppError } from "../../../../../common/error/AppEnumError";
import { AppException } from "../../../../../common/error/errorException";
import { UserSignupMapper as userSignupMapper } from "../mapper/userSignupMapper";
import { IUserSignupApplication } from "../use-case-Interface/IUserSignupApplicationRepo";

export class UserSignupApplication implements IUserSignupApplication{

    private _userRepo:IUserSignupRepositorie
    private _sendEmail:ISendOtpMailService
    private _generateOtp:IGenerateOtpService
    private _hashPassword:IHashService
    private _otpAction:IOtpService
    private _hashOtp:IHashService

    constructor(userRepo:IUserSignupRepositorie,otpEmailService:ISendOtpMailService,generateOtpSrvice:IGenerateOtpService,hashService:IHashService,otpService:IOtpService){
        this._userRepo=userRepo
        this._sendEmail=otpEmailService
        this._generateOtp=generateOtpSrvice
        this._hashPassword=hashService
        this._otpAction=otpService
        this._hashOtp=hashService
    }

    async registerUser(data: IUserSignup): Promise<UserSignupResponseDto | null> {
        try {
            let userExist:IUserSignup | null=await this._userRepo.findByEmail(data.email)
            if(userExist){
                throw new AppException(AppError.USER_ALREADY_EXISTS,409)
            }else{

                let user=userSignupMapper.toRequest(data)

                let otp=this._generateOtp.generateOtp()

                let hashedPassword=await this._hashPassword.hash(user.password!)

                let hashedOtp=await this._hashOtp.hash(otp)

                await this._otpAction.saveOtp(user.email,hashedOtp)

                this._sendEmail.sendOtpMail(user.email,otp)

                setTimeout(()=>{
                    this._otpAction.deleteOtp(user.email)
                },60000*2)

                let newUser={...user,password:hashedPassword}

               let userObj= await this._userRepo.create(newUser)

               return userSignupMapper.toResponse(userObj!)
            }
        } catch (error) {
            throw error;
        }
    }
}