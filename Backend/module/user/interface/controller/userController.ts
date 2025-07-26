import { AppError } from "../../../../common/error/AppEnumError";
import { AppStatusCode } from "../../../../common/statusCode/AppStatusCode";
import { getLawyerResponse } from "../../application/mapper/getLawyerMapper";
import { IGetLawyerDetailsApplication } from "../../application/use-case-interface/IGetLawyerDetailsApplication";
import { IGetLawyerApplication } from "../../application/use-case-interface/IGetLawyersApplication";
import { Request,Response } from "express";

export class UserController{

    constructor(
        private _getLawyerApplication:IGetLawyerApplication,
        private _getLawyerDetailsApplication:IGetLawyerDetailsApplication
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
        } catch (error:any) {
            console.log(error.message)
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }
}