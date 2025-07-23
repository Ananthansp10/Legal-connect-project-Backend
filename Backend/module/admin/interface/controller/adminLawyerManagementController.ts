import { Request,Response } from "express";
import { ILawyerVerificationApplication } from "../../application/use-case-interface/ILawyerVerificationApplication";
import { AppStatusCode } from "../../../../common/statusCode/AppStatusCode";
import { AppError } from "../../../../common/error/AppEnumError";
import { IGetUnverifiedLawyersApplication } from "../../application/use-case-interface/IGetUnverifiedLawyerApplication";
import { ILawyerResponse } from "../../domain/dtos/lawyerDto";
import { IGetLawyersApplication } from "../../application/use-case-interface/IGetLawyerApplication";
import { ILawyerVerificationStatusApplication } from "../../application/use-case-interface/IVerifyLawyerStatusApplication";

export class AdminLawyerManagementController{

    constructor(
        private _verifyLawyerApplication:ILawyerVerificationApplication,
        private _getUnverifiedLawyerApplication:IGetUnverifiedLawyersApplication,
        private _getLawyersApplication:IGetLawyersApplication,
        private _verifyLawyerStatusApplication:ILawyerVerificationStatusApplication
    ){}

    async getUnverifiedLawyers(req:Request,res:Response){
        try {
           let result:ILawyerResponse[] | null =await this._getUnverifiedLawyerApplication.execute()
           res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Data found successfully",data:result})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async verifyLawyer(req:Request,res:Response){
        try {
            let result:boolean=await this._verifyLawyerApplication.execute(req.params.lawyerId,req.params.status,req.params.reason)
            if(result){
                res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Lawyer Approved successfully"})
            }else{
                res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Lawyer rejected successfully"})
            }
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async getLawyers(req:Request,res:Response){
        try {
            let result:ILawyerResponse[] | null=await this._getLawyersApplication.execute()
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Data found successfully",data:result})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async verifyLawyerStatus(req:Request,res:Response){
        try {
            let result:boolean=await this._verifyLawyerStatusApplication.execute(req.params.lawyerId,req.params.status)
            if(result){
                res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Lawyer blocked successfully"})
            }else{
                res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Lawyer unblock successfully"})
            }
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }
}