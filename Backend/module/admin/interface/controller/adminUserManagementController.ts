import { AppError } from "../../../../common/error/AppEnumError";
import { AppStatusCode } from "../../../../common/statusCode/AppStatusCode";
import { IGetUsersApplication } from "../../application/use-case-interface/IGetUsersApplication";
import { Request,Response } from "express";
import { IUserResponse } from "../../domain/dtos/userDto";
import { IVerifyUserStatusApplication } from "../../application/use-case-interface/IVerifyUserStatusApplication";

export class AdminUserManagementController{

    constructor(
        private _getUserApplication:IGetUsersApplication,
        private _verifyUserStatusApplication:IVerifyUserStatusApplication
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