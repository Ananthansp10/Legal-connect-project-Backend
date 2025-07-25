import { AppError } from "../../../../common/error/AppEnumError";
import { AppStatusCode } from "../../../../common/statusCode/AppStatusCode";
import { IAddProfileApplication } from "../../application/use-case-interface/IAddProfileApplication";
import { Request,Response } from "express";
import { IGetProfileApplication } from "../../application/use-case-interface/IGetProfileApplication";
import { UserProfileMapper } from "../../application/mapper/userProfileMapper";
import { IEditProfileApplication } from "../../application/use-case-interface/IEditProfileApplication";


export class UserProfileController{

    constructor(
        private _userAddProfileApplication:IAddProfileApplication,
        private _userGetProfile:IGetProfileApplication,
        private _editUserProfile:IEditProfileApplication
    ){}

    async addProfile(req:Request,res:Response){
        try {
            const imageUrl=req?.file?.path
            await this._userAddProfileApplication.execute(req.body,imageUrl!)
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"User profile added successfully"})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async getUserProfile(req:Request,res:Response){
        try {
            let result:UserProfileMapper | null=await this._userGetProfile.execute(req.params.userId)
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Profile found successfully",data:result})
        } catch (error) {
            console.log(error)
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async editUserProfile(req:Request,res:Response){
        try {
            let imageUrl=req?.file?.path
            let result:UserProfileMapper=await this._editUserProfile.execute(req.body.userId,req.body,imageUrl!)
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Profile edited successfully",data:result})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }
}