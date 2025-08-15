import { IOtpVerificationRepository } from "../../infrastructure/repositoryInterface/IOtpVerificationRepository";
import { AppError } from "../../../../../common/error/AppEnumError";
import { AppException } from "../../../../../common/error/errorException";
import bcrypt from 'bcrypt'
import { IOtpVerificationUseCase } from "../use-case-Interface/IOtpVerificationUseCase";
import { IUserSignupRepository } from "../../infrastructure/repositoryInterface/IUserSignupRepository";
import { AppStatusCode } from "../../../../../common/statusCode/AppStatusCode";

export class OtpVerificationUseCase implements IOtpVerificationUseCase{

    private _otpVerificationRepo:IOtpVerificationRepository;
    private _userRepo:IUserSignupRepository

    constructor(otpVerificationRepo:IOtpVerificationRepository,userRepo:IUserSignupRepository){
        this._otpVerificationRepo=otpVerificationRepo
        this._userRepo=userRepo
    }

    async verifyOtp(email:string,otp:string):Promise<boolean>{
        try {
            let isOtpExist=await this._otpVerificationRepo.findOtpByEmail(email)
            if(!isOtpExist){
                throw new AppException(AppError.OTP_EXPIRED,AppStatusCode.BAD_REQUEST_CODE)
            }else{
                let isOtpMatch=await bcrypt.compare(otp,isOtpExist.otp)
                if(!isOtpMatch){
                    throw new AppException(AppError.INVALID_OTP,AppStatusCode.BAD_REQUEST_CODE)
                }else{
                    await this._userRepo.updateUserToActive(email)
                    return true
                }
            }

        } catch (error) {
            throw error;
        }
    }
}