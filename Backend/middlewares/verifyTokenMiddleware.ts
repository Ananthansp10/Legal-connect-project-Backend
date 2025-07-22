import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'

export const verifyToken=(req:Request,res:Response,next:NextFunction)=>{
    try {
        const accessToken=req?.cookies?.accessToken
        const refreshToken=req?.cookies?.refreshToken

        if(!refreshToken){
            res.status(401).json({success:false,message:'Token expired',isUnAuth:true})
            return
        }
        let decodeToken=jwt.decode(accessToken)
        if (decodeToken && typeof decodeToken !== 'string' && 'exp' in decodeToken) {
            const exp=(decodeToken as JwtPayload).exp
            if(Date.now()>exp!*1000){
                try {
                    let verifyRefreshToken:any=jwt.verify(refreshToken,process.env.JWT_REFRESH_TOKEN_SECRET!)
                    let newAccessToken=jwt.sign({id:verifyRefreshToken.id,role:verifyRefreshToken.role},process.env.JWT_ACCESS_TOKEN_SECRET!,{expiresIn:"30m"})
                    res.cookie('accessToken',newAccessToken,{
                        httpOnly:true,
                        secure:true,
                        sameSite:'none',
                        maxAge: 7 * 24 * 60 * 60000
                    })
                    return next();
                } catch (error) {
                    res.status(401).json({success:false,message:"Invalid refresh token",isUnAuth:true})
                    return
                }
            }else{
                try {
                    let verifyAccessToken:any=jwt.verify(accessToken,process.env.JWT_ACCESS_TOKEN_SECRET!)
                    return next();
                } catch (error) {
                    res.status(401).json({success:false,message:"Invalid access token",isUnAuth:true})
                    return
                }
            }
        } else {
            res.status(401).json({success:false,message:"Invalid token",isUnAuth:true})
            return
        }
    } catch (error) {
        res.status(500).json({success:false,message:"Something went wrong"})
        return
    }
}