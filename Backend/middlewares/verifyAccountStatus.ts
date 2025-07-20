import { Request,Response,NextFunction } from "express";
import { ICheckAccoutStatus } from "../module/auth/userAuth/interface/repositories/checkAccountStatusRepositorie";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { AppStatusCode } from "../module/auth/userAuth/application/statusCode/AppStatusCode";
import { AppError } from "../module/auth/userAuth/application/error/AppEnumError";

export const verifyAccountStatus=(userAccountCheckRepo:ICheckAccoutStatus)=>{
    return async function(req:Request,res:Response,next:NextFunction){
        const token=req?.cookies?.accessToken
        const decodeToken=jwt.decode(token)
        const userId=(decodeToken as JwtPayload).id

        const findUser=await userAccountCheckRepo.findById(userId)

        if(findUser && findUser.isBlock){
            res.status(AppStatusCode.ACCOUNT_BLOCKED).json({success:false,message:AppError.ACCOUNT_BLOCKED,isBlock:true})
            return
        }

        return next();
    }
}