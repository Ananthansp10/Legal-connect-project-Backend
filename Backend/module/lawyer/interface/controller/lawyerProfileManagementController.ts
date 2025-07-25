import { AppError } from "../../../../common/error/AppEnumError";
import { AppStatusCode } from "../../../../common/statusCode/AppStatusCode";
import { IGetLawyerProfileApplication } from "../../application/use-case-interface/IGetLawyerProfileApplication";
import { ILawyerAddProfileApplication } from "../../application/use-case-interface/ILawyerAddProfileApplication";
import { Request,Response } from "express";
import { LawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";
import { IEditLawyerProfileApplication } from "../../application/use-case-interface/IEditLawyerProfileApplication";


export class LawyerProfileController{

    constructor(
        private _lawyerAddProfileApplication:ILawyerAddProfileApplication,
        private _lawyerGetProfileApplication:IGetLawyerProfileApplication,
        private _lawyerEditProfileApplication:IEditLawyerProfileApplication
    ){}

    async addLawyerProfile(req:Request,res:Response){
        try {
            const files = req.files as {
                [fieldname: string]: Express.Multer.File[];
            };

            const imageUrls = {
            profileImage: files.profileImage?.map(file => ({ path: file.path })) || [],
            barCouncilCertificate: files.barCouncilCertificate?.map(file => ({ path: file.path })),
            degreeCertificate: files.degreeCertificate?.map(file => ({ path: file.path })),
            experienceCertificate: files.experienceCertificate?.map(file => ({ path: file.path })),
            idProof: files.idProof?.map(file => ({ path: file.path })),
            };
                await this._lawyerAddProfileApplication.execute(req.body,imageUrls)
                res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Profile added successfully"})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async getLawyerProfile(req:Request,res:Response){
        try {
            let result:LawyerProfileEntity | null=await this._lawyerGetProfileApplication.execute(req.params.lawyerId)
            res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Data found successfully",data:result})
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({sucess:false,message:AppError.UNKNOWN_ERROR})
        }
    }

    async editLawyerProfile(req:Request,res:Response){
        try {
            let imageUrl=req?.file?.path
           await this._lawyerEditProfileApplication.execute(req.body,imageUrl!)
           res.status(AppStatusCode.SUCCESS_CODE).json({success:true,message:"Profile edited successfully"})
        } catch (error:any) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({success:false,message:AppError.UNKNOWN_ERROR})
        }
    }
}