import { Response } from "express";

export interface ICookieTokenService {
    setAuthCookie(res: Response, accessToken: string, refreshToken: string): void;
}