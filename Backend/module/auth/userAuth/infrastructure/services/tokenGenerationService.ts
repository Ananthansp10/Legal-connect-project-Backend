import { ITokenGeneration } from "./ItokenGenerationService";
import jwt from 'jsonwebtoken'

export class TokenGenerationService implements ITokenGeneration{

    private _accessTokenSecret:string;
    private _refreshTokenSecret:string;

    constructor(){
       this._accessTokenSecret=process.env.JWT_ACCESS_TOKEN_SECRET!
       this._refreshTokenSecret=process.env.JWT_REFRESH_TOKEN_SECRET!
    }

     generateAccessToken(payload: object): string {
        let accessToken=jwt.sign(payload,this._accessTokenSecret,{expiresIn:"30m"})
        return accessToken
    }

     generateRefreshToken(payload: object): string {
        let refreshToken=jwt.sign(payload,this._refreshTokenSecret,{expiresIn:"7d"})
        return refreshToken
    }
}