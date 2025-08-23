import { AppError } from "../../../../common/error/AppEnumError";
import { AppStatusCode } from "../../../../common/statusCode/AppStatusCode";
import { IGetAppointmentsUseCase } from "../../application/use-case-interface/IGetAppointmentsUseCase";
import { Request, Response } from "express";
import { IGetReportedAccountsUseCase } from "../../application/use-case-interface/IGetReportedAccountsUseCase";
import { IUpdateReportedAccountStatusUseCase } from "../../application/use-case-interface/IUpdateReportAccountStatusUseCase";
import mongoose, { mongo } from "mongoose";

export class AdminController{

    constructor(
        private _getAppointmentsUseCase:IGetAppointmentsUseCase,
        private _getReportedAccountUseCase:IGetReportedAccountsUseCase,
        private _updateReportedAccountUseCase:IUpdateReportedAccountStatusUseCase
    ){}

    async getAppointments(req:Request,res:Response){
        try {
            let result=await this._getAppointmentsUseCase.execute(req.params.appointmentStatus)
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:'Appointments found successfully',data:result})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async getReportedAccounts(req:Request,res:Response){
        try {
            let result=await this._getReportedAccountUseCase.execute(req.params.userType=='All' ? req.params.userType : req.params.userType.toLowerCase().slice(0,req.params.userType.length-1))
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Reported Accounts found successfully",data:result})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async updateReportedAccountStatus(req:Request,res:Response){
        try {
           await this._updateReportedAccountUseCase.execute(new mongoose.Types.ObjectId(req.params.reportedAccountId))
           res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Updated Reported Account"})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }
}