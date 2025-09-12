import mongoose from "mongoose";
import { AppError } from "../../../../common/error/AppEnumError";
import { AppStatusCode } from "../../../../common/statusCode/AppStatusCode";
import { IAddSlotUseCase } from "../../application/use-case-interface/IAddSlotUseCase";
import { Request,Response } from "express";
import { IGetSlotUseCase } from "../../application/use-case-interface/IGetSlotUseCase";
import { IUpdateRuleStatusUseCase } from "../../application/use-case-interface/IUpdateRuleStatusUseCase";
import { IGetAppointmentUseCase } from "../../application/use-case-interface/IGetAppointmentUseCase";
import { IUpdateAppointmentStatus } from "../../application/use-case-interface/IUpdateAppointmentStatusUseCase";
import { IGetSubscriptionPlanUseCase } from "../../application/use-case-interface/IGetSubscriptionPlanUseCase";
import { AppException } from "../../../../common/error/errorException";
import { IAddPlanUseCase } from "../../application/use-case-interface/IAddPlanUseCase";
import { IGetLawyerAllChatsUseCase } from "../../application/use-case-interface/IGetLawyerAllChatUseCase";
import { IGetLawyerChatUseCase } from "../../application/use-case-interface/IGetLawyerChatUseCase";
import { IGetUserChatProfileUseCase } from "../../application/use-case-interface/IGetUserChatProfileUseCase";
import { IUpdateReadStatusUseCase } from "../../application/use-case-interface/IUpdateReadStatusUseCase";
import { IAddBankAccountDetailsUseCase } from "../../application/use-case-interface/IAddBankAccountDetailsUseCase";
import { IGetSummaryUseCase } from "../../application/use-case-interface/IGetSummaryUseCase";
import { ICheckBankDetailsUseCase } from "../../application/use-case-interface/ICheckBankDetailsUseCase";


export class LawyerController{

    constructor(
        private _addSlotApplication:IAddSlotUseCase,
        private _getSlotApplication:IGetSlotUseCase,
        private _updateRuleStatusApplication:IUpdateRuleStatusUseCase,
        private _getAppointmentUseCase:IGetAppointmentUseCase,
        private _updateAppointmentStatusUseCase:IUpdateAppointmentStatus,
        private _getSubscriptionPlanUseCase:IGetSubscriptionPlanUseCase,
        private _addPlanUseCase:IAddPlanUseCase,
        private _getLawyerAllChatsUseCase:IGetLawyerAllChatsUseCase,
        private _getLawyerChatUseCase:IGetLawyerChatUseCase,
        private _getUserChatProfileUseCase:IGetUserChatProfileUseCase,
        private _updateChatReadStatusUseCase:IUpdateReadStatusUseCase,
        private _addBankAccountDetailsUseCase:IAddBankAccountDetailsUseCase,
        private _getSummaryUseCase:IGetSummaryUseCase,
        private checkBankDetailsUseCase:ICheckBankDetailsUseCase
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
            let result=await this._updateRuleStatusApplication.execute(new mongoose.Types.ObjectId(req.params.ruleId),req.params.ruleStatus)
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message: result=='true' ? "Rule has disabled" : "Rule has enabled"})
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
            await this._updateAppointmentStatusUseCase.execute(new mongoose.Types.ObjectId(req.params.appointmentId),req.params.appointmentStatus,new mongoose.Types.ObjectId(req.params.lawyerId))
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:`Appointment ${req.params.appointmentStatus} successfully`})
        } catch (error) {
            if(error instanceof AppException){
                res.status(error.statusCode).json({success:false,message:error.message})
            }
            else{
                res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
            }
        }
    }

    async getSubscriptionPlan(req:Request,res:Response){
        try {
            let result=await this._getSubscriptionPlanUseCase.execute()
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:'Subscription plan found',data:result})
        } catch (error) {
           res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:true,message:AppError.UNKNOWN_ERROR})
        }
    }

    async addPlan(req:Request,res:Response){
        try {
            await this._addPlanUseCase.execute(new mongoose.Types.ObjectId(req.params.lawyerId),new mongoose.Types.ObjectId(req.params.planId))
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Subscription plan addedd"})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async getAllChats(req:Request,res:Response){
        try {
            let result=await this._getLawyerAllChatsUseCase.execute(new mongoose.Types.ObjectId(req.params.lawyerId))
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Lawyer all chats found successfully",data:result})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async getChat(req:Request,res:Response){
        try {
            let result=await this._getLawyerChatUseCase.execute(new mongoose.Types.ObjectId(req.params.lawyerId),new mongoose.Types.ObjectId(req.params.userId))
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Chat found successfully",data:result})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async getUserChatProfile(req:Request,res:Response){
        try {
            let result=await this._getUserChatProfileUseCase.execute(new mongoose.Types.ObjectId(req.params.userId))
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"User chat profile found",data:result})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async updateChatReadStatus(req:Request,res:Response){
        try {
           await this._updateChatReadStatusUseCase.execute(new mongoose.Types.ObjectId(req.params.lawyerId),new mongoose.Types.ObjectId(req.params.userId))
           res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Chat read status updated"})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async addBankAccount(req:Request,res:Response){
        try {
           await this._addBankAccountDetailsUseCase.execute(req.body)
           res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Bank details added successfully"})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({SUCCESS:false,MESSAGE:AppError.UNKNOWN_ERROR})
        }
    }

    async getSummary(req:Request,res:Response){
        try {
            let result=await this._getSummaryUseCase.execute(new mongoose.Types.ObjectId(req.params.lawyerId))
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Summary found successfully",data:result})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async checkBankDetails(req:Request,res:Response){
        try {
           let result=await this.checkBankDetailsUseCase.execute(new mongoose.Types.ObjectId(req.params.lawyerId))
           res.status(AppStatusCode.SUCCESS_CODE).json({success: result ? true : false,message: result ? "Bank Details found successfully" : "Bank details not found"})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }
}