import { IOtpVerificationRepo } from "../../interface/repositories/otpVerificationRepositories";
import { AppError } from "../../../../../common/error/AppEnumError";
import { AppException } from "../../../../../common/error/errorException";
import bcrypt from 'bcrypt'
import { IOtpVerificationApplication } from "../use-case-Interface/IOtpVerificationApplication";
import { IUserSignupRepositorie } from "../../interface/repositories/userSignupRepositorie";
import { AppStatusCode } from "../../../../../common/statusCode/AppStatusCode";

export class OtpVerificationApplication implements IOtpVerificationApplication{

    private _otpVerificationRepo:IOtpVerificationRepo;
    private _userRepo:IUserSignupRepositorie

    constructor(otpVerificationRepo:IOtpVerificationRepo,userRepo:IUserSignupRepositorie){
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