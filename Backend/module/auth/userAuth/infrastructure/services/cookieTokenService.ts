import { ICookieTokenService } from "./IcookieTokenService";
import { Response } from "express";

export class CookieTokenService implements ICookieTokenService {

    setAuthCookie(res: Response, accessToken: string, refreshToken: string): void {

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60000
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60000
        })
    }
}