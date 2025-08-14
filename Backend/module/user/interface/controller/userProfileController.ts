import { AppError } from "../../../../common/error/AppEnumError";
import { AppStatusCode } from "../../../../common/statusCode/AppStatusCode";
import { IAddProfileUseCase } from "../../application/use-case-interface/IAddProfileUseCase";
import { Request,Response } from "express";
import { IGetProfileUseCase } from "../../application/use-case-interface/IGetProfileUseCase";
import { UserProfileMapper } from "../../application/mapper/userProfileMapper";
import { IEditProfileUseCase } from "../../application/use-case-interface/IEditProfileUseCase";


export class UserProfileController{

    constructor(
        private _userAddProfileApplication:IAddProfileUseCase,
        private _userGetProfile:IGetProfileUseCase,
        private _editUserProfile:IEditProfileUseCase
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