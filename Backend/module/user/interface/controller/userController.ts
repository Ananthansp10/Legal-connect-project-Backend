import { AppError } from "../../../../common/error/AppEnumError";
import { AppStatusCode } from "../../../../common/statusCode/AppStatusCode";
import { getLawyerResponse } from "../../application/mapper/getLawyerMapper";
import { IGetLawyerDetailsUseCase } from "../../application/use-case-interface/IGetLawyerDetailsUseCase";
import { IGetLawyerUseCase } from "../../application/use-case-interface/IGetLawyersUseCase";
import { Request,Response } from "express";
import { IGetLawyerSlotApplication } from "../../application/use-case-interface/IGetLawyerSlotUseCase";
import { IFilterLawyerUseCase } from "../../application/use-case-interface/IFilterLawyerUseCase";
import { ISearchLawyerUseCase } from "../../application/use-case-interface/ISearchLawyerUseCase";
import { IBookAppointmentUseCase } from "../../application/use-case-interface/IBookAppointmentUseCase";
import mongoose from "mongoose";
import { IGetAppointmentUseCase } from "../../application/use-case-interface/IGetAppointmentUseCase";
import { ICancelAppointmentUseCase } from "../../application/use-case-interface/ICancelAppointmentUseCase";
import { AppException } from "../../../../common/error/errorException";
import { IGetTodaysAppointmentsUseCase } from "../../application/use-case-interface/IGetTodaysAppointmentUseCase";
import { IResheduleAppointmentUseCase } from "../../application/use-case-interface/IResheduleAppointmentUseCase";
import { IReportLawyerUseCase } from "../../application/use-case-interface/IReportLawyerUseCase";
import { IGetUserChatUseCase } from "../../application/use-case-interface/IGetUserChatUseCase";
import { IGetAllChatUseCase } from "../../application/use-case-interface/IGetAllChatUseCase";
import { IGetLawyerChatProfileUseCase } from "../../application/use-case-interface/IGetLawyerChatProfileUseCase";

export class UserController{

    constructor(
        private _getLawyerApplication:IGetLawyerUseCase,
        private _getLawyerDetailsApplication:IGetLawyerDetailsUseCase,
        private _getLawyerSlotApplication:IGetLawyerSlotApplication,
        private _filterLawyerApplication:IFilterLawyerUseCase,
        private _searchLawyerApplication:ISearchLawyerUseCase,
        private _bookAppointmentApplication:IBookAppointmentUseCase,
        private _getAppointmentApplication:IGetAppointmentUseCase,
        private _cancelAppointmentUseCase:ICancelAppointmentUseCase,
        private _getTodaysAppointmentUseCase:IGetTodaysAppointmentsUseCase,
        private _resheduleAppointmentUseCase:IResheduleAppointmentUseCase,
        private _reportLawyerUseCase:IReportLawyerUseCase,
        private _getUserChatUseCase:IGetUserChatUseCase,
        private _getUserAllChatsUseCase:IGetAllChatUseCase,
        private _getLawyerChatProfileUseCase:IGetLawyerChatProfileUseCase
    ){}

    async getLawyers(req:Request,res:Response){
        try {
            let result:getLawyerResponse[] | null=await this._getLawyerApplication.execute()
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Lawyers found successfully",data:result})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:"Lawyers not found"})
        }
    }

    async getLawyerDetails(req:Request,res:Response){
        try {
           let result=await this._getLawyerDetailsApplication.execute(req.params.lawyerId)
           res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Lawyer Details found successfully",data:result})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async getSlotDetails(req:Request,res:Response){
        try {
            let timeSlots=await this._getLawyerSlotApplication.execute(new mongoose.Types.ObjectId(req.params.lawyerId),req.params.date)
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:'Time slots found',timeSlots:timeSlots})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async filterLawyerBySpecialization(req:Request,res:Response){
        try {
            let result=await this._filterLawyerApplication.execute(req.params.specialization)
            if(result){
                res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Data found successfully",data:result})
            }
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async searchLawyerByName(req:Request,res:Response){
        try {
            let result=await this._searchLawyerApplication.execute(req.params.name)
            if(result){
                res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Data found successfully",data:result})
            }
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async bookAppointment(req:Request,res:Response){
        try {
            await this._bookAppointmentApplication.execute(req.body)
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Appointment booked successfully"})
        } catch (error) {
          res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})  
        }
    }

    async getAppointment(req:Request,res:Response){
        try {
            let appointments=await this._getAppointmentApplication.execute(new mongoose.Types.ObjectId(req.params.userId),req.params.appointmentStatus)
            console.log(appointments)
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Appointment found successfully",data:appointments})
        } catch (error) {
            console.log(error)
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async cancelAppointment(req:Request,res:Response){
        try {
           await this._cancelAppointmentUseCase.execute(new mongoose.Types.ObjectId(req.params.appointmentId))
           res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Appointment cancelled successfully"})
        } catch (error) {
            if(error instanceof AppException){
                res.status(error.statusCode).json({success:false,message:error.message})
            }else{
                res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
            }
        }
    }

    async getTodaysAppointments(req:Request,res:Response){
        try {
            let result=await this._getTodaysAppointmentUseCase.execute(new mongoose.Types.ObjectId(req.params.userId))
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:'Todays appointments found',data:result})
        } catch (error) {
            console.log(error)
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async resheduleAppointment(req:Request,res:Response){
        try {
           await this._resheduleAppointmentUseCase.execute(new mongoose.Types.ObjectId(req.params.appointmentId))
           res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Appointment reshedule"})
        } catch (error) {
           res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async reportLawyer(req:Request,res:Response){
        try {
            await this._reportLawyerUseCase.execute(req.body)
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Report lawyer successfully"})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async getUserChat(req:Request,res:Response){
        try {
           let result=await this._getUserChatUseCase.execute(new mongoose.Types.ObjectId(req.params.userId),new mongoose.Types.ObjectId(req.params.lawyerId))
           res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Message found successfully",data:result})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async getUserAllChats(req:Request,res:Response){
        try {
            let result=await this._getUserAllChatsUseCase.execute(new mongoose.Types.ObjectId(req.params.userId))
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"User chat found successfully",data:result})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async getLawyerChatProfile(req:Request,res:Response){
        try {
            let result=await this._getLawyerChatProfileUseCase.execute(new mongoose.Types.ObjectId(req.params.lawyerId))
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Lawyer chat profile found successfully",data:result})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }
}