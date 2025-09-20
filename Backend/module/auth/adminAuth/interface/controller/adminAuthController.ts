import { Request, Response } from "express-serve-static-core";
import { IAdminSigninUseCase } from "../../application/use-case-interface/IadminSigninUseCase";
import { ICookieTokenService } from "../../../userAuth/infrastructure/services/IcookieTokenService";
import { AppStatusCode } from "../../../../../common/statusCode/AppStatusCode";
import { AppException } from "../../../../../common/error/errorException";
import { AppError } from "../../../../../common/error/AppEnumError";

export class AdminAuthController {

    constructor(
        private _adminSigninApplication: IAdminSigninUseCase,
        private _tokenCookieService: ICookieTokenService
    ) { }

    async signin(req: Request, res: Response) {
        try {
            const { accessToken, refreshToken } = await this._adminSigninApplication.execute(req.body)
            this._tokenCookieService.setAuthCookie(res, accessToken, refreshToken)
            res.status(AppStatusCode.SUCCESS_CODE).json({ success: true, message: "Login successfully", data: { name: "admin" } })
        } catch (error) {
            if (error instanceof AppException) {
                res.status(error.statusCode).json({ success: false, message: error.message })
            } else {
                res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({ success: false, message: AppError.UNKNOWN_ERROR })
            }
        }
    }

    async logout(req: Request, res: Response) {
        try {

            res.clearCookie('accessToken', {
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            })

            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            })

            res.status(AppStatusCode.SUCCESS_CODE).json({ success: true, message: "Logout successfully" })
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({ success: false, message: AppError.UNKNOWN_ERROR })
        }
    }
}