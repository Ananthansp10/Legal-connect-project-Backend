import { AppError } from "../../../../common/error/AppEnumError";
import { AppStatusCode } from "../../../../common/statusCode/AppStatusCode";
import { getLawyerResponse } from "../../application/mapper/getLawyerMapper";
import { IGetLawyerDetailsApplication } from "../../application/use-case-interface/IGetLawyerDetailsApplication";
import { IGetLawyerApplication } from "../../application/use-case-interface/IGetLawyersApplication";
import { Request,Response } from "express";
import { IGetLawyerSlotApplication } from "../../application/use-case-interface/IGetLawyerSlotApplication";
import { IFilterLawyerApplication } from "../../application/use-case-interface/IFilterLawyerApplication";
import { ISearchLawyerApplication } from "../../application/use-case-interface/ISearchLawyerApplication";
import { IBookAppointmentApplication } from "../../application/use-case-interface/IBookAppointmentApplication";

export class UserController{

    constructor(
        private _getLawyerApplication:IGetLawyerApplication,
        private _getLawyerDetailsApplication:IGetLawyerDetailsApplication,
        private _getLawyerSlotApplication:IGetLawyerSlotApplication,
        private _filterLawyerApplication:IFilterLawyerApplication,
        private _searchLawyerApplication:ISearchLawyerApplication,
        private _bookAppointmentApplication:IBookAppointmentApplication
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