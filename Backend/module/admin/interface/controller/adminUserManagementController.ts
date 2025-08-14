import { AppError } from "../../../../common/error/AppEnumError";
import { AppStatusCode } from "../../../../common/statusCode/AppStatusCode";
import { IGetUsersUseCase } from "../../application/use-case-interface/IGetUsersUseCase";
import { Request,Response } from "express";
import { IUserResponse } from "../../domain/dtos/userDto";
import { IVerifyUserStatusUseCase } from "../../application/use-case-interface/IVerifyUserStatusUseCase";

export class AdminUserManagementController{

    constructor(
        private _getUserApplication:IGetUsersUseCase,
        private _verifyUserStatusApplication:IVerifyUserStatusUseCase
    ){}

    async getUsers(req:Request,res:Response){
        try {
            let result:IUserResponse[] | null=await this._getUserApplication.execute()
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Data found successfully",data:result})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async verifyUserStatus(req:Request,res:Response){
        try {
            let result:boolean=await this._verifyUserStatusApplication.execute(req.params.userId,req.params.status)
            if(result){
                res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"User blocked successfully"})
            }else{
                res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"User unblocked successfully"})
            }
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }
}