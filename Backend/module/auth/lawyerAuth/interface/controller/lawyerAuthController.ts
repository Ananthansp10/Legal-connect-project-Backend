import { ILawyerSignupApplication } from "../../application/lawyer-use-case-interface/IlawyerSignupApplication";
import { Request,Response } from "express";
import { AppStatusCode } from "../../../userAuth/application/statusCode/AppStatusCode";
import { AppException } from "../../../userAuth/application/error/errorException";
import { AppError } from "../../../userAuth/application/error/AppEnumError";
import { ICookieTokenService } from "../../../userAuth/infrastructure/services/IcookieTokenService";
import { ILawyerSigninApplication } from "../../application/lawyer-use-case-interface/IlawyerSigninApplication";
import { ILawyerForgotPasswordApplication } from "../../application/lawyer-use-case-interface/IlawyerForgotPasswordApplication";
import { ILawyerChangePasswordApplication } from "../../application/lawyer-use-case-interface/IlawyerChangePasswordApplication";
import { ILawyerResetPasswordApplication } from "../../application/lawyer-use-case-interface/IlawyerResetPasswordApplication";

export interface MulterRequest extends Request {
  files?: Express.Multer.File[];
}



export class LawyerAuthController{

    constructor(
        private _lawyerSignupApplication:ILawyerSignupApplication,
        private _lawyerSigninApplication:ILawyerSigninApplication,
        private _lawyerForgotPasswordApplication:ILawyerForgotPasswordApplication,
        private _lawyerChangePasswordApplication:ILawyerChangePasswordApplication,
        private _lawyerResetPasswordApplication:ILawyerResetPasswordApplication
    ){}

    async registerLawyer(req:MulterRequest,res:Response):Promise<void>{
        try {
            let imageUrl=req?.files?.map((file)=>file.path)

            let requestObj={...req.body,documents:imageUrl}

            let result=await this._lawyerSignupApplication.registerLawyer(requestObj)

            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Lawyer registered successfully",data:result})
        } catch (error) {
            if(error instanceof AppException){
                res.status(error.statusCode).json({success:false,message:error.message})
            }else{
                res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
            }
        }
    }

    async siginLawyer(req:Request,res:Response,cookieTokenService:ICookieTokenService){
        try {
            let {lawyerDetails,accessToken,refreshToken}=await this._lawyerSigninApplication.execute(req.body.email,req.body.password)
            cookieTokenService.setAuthCookie(res,accessToken,refreshToken)
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Login successfully",data:lawyerDetails})
        } catch (error) {
            if(error instanceof AppException){
                res.status(error.statusCode).json({success:false,message:error.message})
            }else{
                res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
            }
        }
    }

    async logout(req:Request,res:Response){
        try {
            res.clearCookie('accessToken',{
                httpOnly:true,
                secure:true,
                sameSite:'none',
            })
            res.clearCookie('refreshToken',{
                httpOnly:true,
                secure:true,
                sameSite:'none'
            })
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Logout successfully"})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async forgotPassword(req:Request,res:Response){
        try {
            await this._lawyerForgotPasswordApplication.execute(req.body.email)
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Reset password link has sent to your email"})
        } catch (error) {
            if(error instanceof AppException){
                res.status(error.statusCode).json({success:false,message:error.message})
            }else{
                res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
            }
        }
    }

    async changePassword(req:Request,res:Response){
        try {
            await this._lawyerChangePasswordApplication.changePassword(req.body.email,req.body.password,req.body.token)
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Password changed successfully"})
        } catch (error) {
            if(error instanceof AppException){
                res.status(error.statusCode).json({success:false,message:error.message})
            }else{
                res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
            }
        }
    }

    async resetPassword(req:Request,res:Response){
        try {
            await this._lawyerResetPasswordApplication.resetPassword(req.body.email,req.body.oldPassword,req.body.newPassword)
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