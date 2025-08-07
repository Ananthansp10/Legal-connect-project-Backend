import { AppError } from "../../../../common/error/AppEnumError";
import { AppException } from "../../../../common/error/errorException";
import { AppStatusCode } from "../../../../common/statusCode/AppStatusCode";
import { IAddSlotApplication } from "../../application/use-case-interface/IAddSlotApplication";
import { Request,Response } from "express";


export class LawyerController{

    constructor(
        private addSlotApplication:IAddSlotApplication
    ){}

    async addSlot(req:Request,res:Response):Promise<void>{
        try {
            await this.addSlotApplication.execute(req.body)
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Slot addedd successfully"})
        } catch (error) {
            if(error instanceof AppException){
                res.status(error.statusCode).json({success:false,message:error.message})
            }else{
                res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
            }
        }
    }
}