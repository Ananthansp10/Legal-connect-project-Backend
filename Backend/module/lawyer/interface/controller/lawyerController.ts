import mongoose from "mongoose";
import { AppError } from "../../../../common/error/AppEnumError";
import { AppStatusCode } from "../../../../common/statusCode/AppStatusCode";
import { IAddSlotUseCase } from "../../application/use-case-interface/IAddSlotUseCase";
import { Request,Response } from "express";
import { IGetSlotUseCase } from "../../application/use-case-interface/IGetSlotUseCase";
import { IUpdateRuleStatusUseCase } from "../../application/use-case-interface/IUpdateRuleStatusUseCase";


export class LawyerController{

    constructor(
        private _addSlotApplication:IAddSlotUseCase,
        private _getSlotApplication:IGetSlotUseCase,
        private _updateRuleStatusApplication:IUpdateRuleStatusUseCase
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

    async updateRuleStatus(req:Request,res:Response){
        try {
           let result=await this._updateRuleStatusApplication.execute(new mongoose.Types.ObjectId(req.params.ruleId),Boolean(req.params.ruleStatus))
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message: result ? "Rule has disabled" : "Rule has enabled"})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }
}