import { IUserSignupApplication } from "../../application/use-case-Interface/IUserSignupApplicationRepo";
import { Request,Response } from "express";
import { IUserSignup } from "../../domain/userRegisterEntity";
import { AppException } from "../../../../../common/error/errorException";
import { AppError } from "../../../../../common/error/AppEnumError";
import { IOtpVerificationApplication } from "../../application/use-case-Interface/IOtpVerificationApplication";
import { AppStatusCode } from "../../../../../common/statusCode/AppStatusCode";
import { IResendOtpApplication } from "../../application/use-case-Interface/IResendOtpApplication";
import { IForgotPasswordApplication } from "../../application/use-case-Interface/IforgotPasswordApllication";
import { IChangePasswordApplication } from "../../application/use-case-Interface/IchangePasswordApplication";
import { IUserSigninApplication } from "../../application/use-case-Interface/IUserSigninApplication";
import { ICookieTokenService } from "../../infrastructure/services/IcookieTokenService";
import { UserSigninDto } from "../../domain/dto/userSigninDto";
import { IGoogleAuthApplication } from "../../application/use-case-Interface/IgoogleAuthApplication";
import { GoogleAuthEntity } from "../../domain/googleAuthEntity";
import { IResetPasswordApplication } from "../../application/use-case-Interface/IresetPasswordApplication";

export class UserAuthController{

    constructor(

        private _userSignupApplication:IUserSignupApplication, 
        private _otpVerificationApplication:IOtpVerificationApplication,
        private _resendOtpApplication:IResendOtpApplication,
        private _forgotPasswordApplication:IForgotPasswordApplication,
        private _changePassword:IChangePasswordApplication,
        private _userSigninAplication:IUserSigninApplication,
        private _googleAuthApplication:IGoogleAuthApplication,
        private _resetPasswordApplication:IResetPasswordApplication

    ){}

    async registerUser(req:Request,res:Response):Promise<void>{
        try {
        let result:Omit<IUserSignup,'isBlock' | 'isActive' | 'password'> | null=await this._userSignupApplication.registerUser(req.body)
        res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"OTP has successfully send to your email",data:result})
        } catch (error) {
            if(error instanceof AppException){
                res.status(error.statusCode).json({success:false,message:error.message})
            }else{
                res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
            }
        }
    }

    async verifyOtp(req:Request,res:Response):Promise<void>{
        try {
          await this._otpVerificationApplication.verifyOtp(req.body.userDetails.email,req.body.otp)
          res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"OTP verified successfully"})
        } catch (error) {
            if(error instanceof AppException){
                res.status(error.statusCode).json({success:false,message:error.message})
            }else{
                res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
            }
        }
    }

    async resendOtp(req:Request,res:Response):Promise<void>{
        try {
           await this._resendOtpApplication.resendOtp(req.body.email)
           res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"OTP send successfully to your email"})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async forgotPassword(req:Request,res:Response):Promise<void>{
        try {
            let result=await this._forgotPasswordApplication.execute(req.body.email)
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"OTP send successfully to your email",data:result})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async changePassword(req:Request,res:Response):Promise<void>{
        try {
            await this._changePassword.changePassword(req.body.email,req.body.password)
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Password changed successfully"})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async signin(req:Request,res:Response,cookieTokenService:ICookieTokenService):Promise<void>{
        try {
            let {userData,accessToken,refreshToken}:UserSigninDto=await this._userSigninAplication.execute(req.body.email,req.body.password)
            cookieTokenService.setAuthCookie(res,accessToken,refreshToken)
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"User login successfully",user:userData})
        } catch (error) {
            if(error instanceof AppException){
                res.status(error.statusCode).json({success:false,message:error.message})
            }else{
                res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
            }
        }
    }

    async googleAuthentication(req:Request,res:Response,cookieTokenService:ICookieTokenService):Promise<void>{
        try {
            let {userData,accessToken,refreshToken}:UserSigninDto=await this._googleAuthApplication.execute(req.user as GoogleAuthEntity)
            cookieTokenService.setAuthCookie(res,accessToken,refreshToken)
            res.cookie('googleAuthDetails',userData)
            res.redirect('http://localhost:5173/user-dashboard')
        } catch (error) {
            if(error instanceof AppException){
                if(error.message==AppError.USER_ALREADY_EXISTS){
                    res.redirect('http://localhost:5173/emailExist')
                }else{
                    res.redirect('http://localhost:5173/block-page')
                }
            }else{
                res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
            }
        }
    }

    async logout(req:Request,res:Response):Promise<void>{
        try {
            res.clearCookie('accessToken',{
                httpOnly:true,
                secure:true,
                sameSite:'none'
            })
            res.clearCookie('refreshToken',{
                httpOnly:true,
                secure:true,
                sameSite:'none'
            })
            if(req?.cookies?.googleAuthDetails){
                res.clearCookie('googleAuthDetails')
            }
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Logout successfully"})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    getGoogleAuthDetails(req:Request,res:Response){
        try {
            const data:GoogleAuthEntity=req?.cookies?.googleAuthDetails
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Data found successfully",result:data})
        } catch (error) {
            
        }
    }

    async resetPassword(req:Request,res:Response):Promise<void>{
        try {
            await this._resetPasswordApplication.execute(req.body.email,req.body.oldPassword,req.body.newPassword)
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Password changed successfully"})
        } catch (error) {
            if(error instanceof AppException){
                res.status(error.statusCode).json({success:false,message:error.message})
            }else{
                res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
            }
        }
    }

}