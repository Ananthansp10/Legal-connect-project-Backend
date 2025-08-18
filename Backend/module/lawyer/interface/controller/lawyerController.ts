import mongoose from "mongoose";
import { AppError } from "../../../../common/error/AppEnumError";
import { AppStatusCode } from "../../../../common/statusCode/AppStatusCode";
import { IAddSlotUseCase } from "../../application/use-case-interface/IAddSlotUseCase";
import { Request,Response } from "express";
import { IGetSlotUseCase } from "../../application/use-case-interface/IGetSlotUseCase";
import { IUpdateRuleStatusUseCase } from "../../application/use-case-interface/IUpdateRuleStatusUseCase";
import { IGetAppointmentUseCase } from "../../application/use-case-interface/IGetAppointmentUseCase";
import { IUpdateAppointmentStatus } from "../../application/use-case-interface/IUpdateAppointmentStatusUseCase";


export class LawyerController{

    constructor(
        private _addSlotApplication:IAddSlotUseCase,
        private _getSlotApplication:IGetSlotUseCase,
        private _updateRuleStatusApplication:IUpdateRuleStatusUseCase,
        private _getAppointmentUseCase:IGetAppointmentUseCase,
        private _updateAppointmentStatusUseCase:IUpdateAppointmentStatus
    ){}

    async addSlot(req:Request,res:Response):Promise<void>{
       try {
           await this._addSlotApplication.execute(new mongoose.Types.ObjectId(req.params.lawyerId),req.body)
           res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Slot addedd successfully"})
       } catch (error) {
           res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
       }
    }

    async getSlot(req:Request,res:Response):Promise<void>{
        try {
            let result=await this._getSlotApplication.execute(new mongoose.Types.ObjectId(req.params.lawyerId),req.params.type)
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Data found successfully",data:result})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async updateRuleStatus(req:Request,res:Response):Promise<void>{
        try {
            let result=await this._updateRuleStatusApplication.execute(new mongoose.Types.ObjectId(req.params.ruleId),Boolean(req.params.ruleStatus))
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message: result ? "Rule has disabled" : "Rule has enabled"})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async getAppointments(req:Request,res:Response):Promise<void>{
        try {
            let appointments=await this._getAppointmentUseCase.execute(new mongoose.Types.ObjectId(req.params.lawyerId),req.params.appointmentStatus)
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Appointments found successfully",data:appointments})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({status:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async updateAppointmentStatus(req:Request,res:Response){
        try {
            await this._updateAppointmentStatusUseCase.execute(new mongoose.Types.ObjectId(req.params.appointmentId),req.params.appointmentStatus)
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:`Appointment ${req.params.appointmentStatus} successfully`})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }
}