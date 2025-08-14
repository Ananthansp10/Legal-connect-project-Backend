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

export class UserController{

    constructor(
        private _getLawyerApplication:IGetLawyerUseCase,
        private _getLawyerDetailsApplication:IGetLawyerDetailsUseCase,
        private _getLawyerSlotApplication:IGetLawyerSlotApplication,
        private _filterLawyerApplication:IFilterLawyerUseCase,
        private _searchLawyerApplication:ISearchLawyerUseCase,
        private _bookAppointmentApplication:IBookAppointmentUseCase
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
            let result=await this._getLawyerSlotApplication.execute(req.params.lawyerId,req.params.date)
            console.log(result)
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:'Slot found successfully',data:result})
        } catch (error) {
           console.log(error)
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
}