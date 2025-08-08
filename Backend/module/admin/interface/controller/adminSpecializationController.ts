import { AppError } from "../../../../common/error/AppEnumError";
import { AppStatusCode } from "../../../../common/statusCode/AppStatusCode";
import { IAddSpecializationApplication } from "../../application/use-case-interface/IAddSpecialisationApplication";
import { Request,Response } from "express";
import { IGetSpecializationApplication } from "../../application/use-case-interface/IGetSpecializationApplication";
import { IEditSpecializationApplication } from "../../application/use-case-interface/IEditSpecializationApplication";
import { IDeleteSpecializationApplication } from "../../application/use-case-interface/IDeleteSpecializationApplication";


export class AdminSpecializationController{

    constructor(
        private _addSpecializationApplication:IAddSpecializationApplication,
        private _getSpecializationApplication:IGetSpecializationApplication,
        private _editSpecializationApplication:IEditSpecializationApplication,
        private _deleteSpecializationApplication:IDeleteSpecializationApplication
    ){}

    async addSpecialization(req:Request,res:Response):Promise<void>{
        try {
            await this._addSpecializationApplication.execute(req.body)
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Specialization added successfully"})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async getSpecialization(req:Request,res:Response):Promise<void>{
        try {
            let result=await this._getSpecializationApplication.execute()
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Specialization data found successfully",data:result})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async editSpecialization(req:Request,res:Response):Promise<void>{
        try {
            await this._editSpecializationApplication.execute(req.body.specId,{name:req.body.name,description:req.body.description,isDeleted:req.body.isDeleted})
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Specialization edited successfully"})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async DeleteSpecializationApplication(req:Request,res:Response):Promise<void>{
        try {
            await this._deleteSpecializationApplication.execute(req.params.specId)
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Specialization deleted successfully"})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }
}