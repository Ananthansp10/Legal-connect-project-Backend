import {Request,Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

export const verifyRole=([...role]:string[])=>{
    return function(req:Request,res:Response,next:NextFunction){
        const token=req?.cookies?.accessToken
            const decodeToken:any=jwt.decode(token)

        if(!role.includes(decodeToken.role)){
            res.status(403).json({success:false,message:"Access Denied",isUnAuth:true})
            return
        }
        return next();
    }    

}