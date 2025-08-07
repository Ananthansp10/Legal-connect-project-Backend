import { AppError } from "../../../../common/error/AppEnumError";
import { AppStatusCode } from "../../../../common/statusCode/AppStatusCode";
import { IAddSpecializationApplication } from "../../application/use-case-interface/IAddSpecialisationApplication";
import { Request,Response } from "express";
import { IGetSpecializationApplication } from "../../application/use-case-interface/IGetSpecializationApplication";


export class AdminSpecializationController{

    constructor(
        private addSpecializationApplication:IAddSpecializationApplication,
        private getSpecializationApplication:IGetSpecializationApplication
    ){}

    async addSpecialization(req:Request,res:Response):Promise<void>{
        try {
            await this.addSpecializationApplication.execute(req.body)
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Specialization added successfully"})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async getSpecialization(req:Request,res:Response):Promise<void>{
        try {
            let result=await this.getSpecializationApplication.execute()
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Specialization data found successfully",data:result})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }
}