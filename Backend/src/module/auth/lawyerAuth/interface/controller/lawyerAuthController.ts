import { ILawyerSignupUseCase } from "../../application/lawyer-use-case-interface/IlawyerSignupUseCase";
import { Request, Response } from "express";
import { AppStatusCode } from "../../../../../common/statusCode/AppStatusCode";
import { AppException } from "../../../../../common/error/errorException";
import { AppError } from "../../../../../common/error/AppEnumError";
import { ICookieTokenService } from "../../../userAuth/infrastructure/services/IcookieTokenService";
import { ILawyerSigninUseCase } from "../../application/lawyer-use-case-interface/IlawyerSigninUseCase";
import { ILawyerForgotPasswordUseCase } from "../../application/lawyer-use-case-interface/IlawyerForgotPasswordUseCase";
import { ILawyerChangePasswordUseCase } from "../../application/lawyer-use-case-interface/IlawyerChangePasswordUseCase";
import { ILawyerResetPasswordUseCase } from "../../application/lawyer-use-case-interface/IlawyerResetPasswordUseCase";
import jwt from "jsonwebtoken";

export interface IMulterRequest extends Request {
  files?: Express.Multer.File[];
}

export class LawyerAuthController {
  constructor(
    private _lawyerSignupApplication: ILawyerSignupUseCase,
    private _lawyerSigninApplication: ILawyerSigninUseCase,
    private _lawyerForgotPasswordApplication: ILawyerForgotPasswordUseCase,
    private _lawyerChangePasswordApplication: ILawyerChangePasswordUseCase,
    private _lawyerResetPasswordApplication: ILawyerResetPasswordUseCase,
  ) {}

  async registerLawyer(req: IMulterRequest, res: Response): Promise<void> {
    try {
      const imageUrl = req?.files?.map((file) => file.path);

      const requestObj = { ...req.body, documents: imageUrl };

      const result =
        await this._lawyerSignupApplication.registerLawyer(requestObj);

      res.status(AppStatusCode.SUCCESS_CODE).json({
        success: true,
        message: "Lawyer registered successfully",
        data: result,
      });
    } catch (error) {
      console.log(error);
      if (error instanceof AppException) {
        res
          .status(error.statusCode)
          .json({ success: false, message: error.message });
      } else {
        res
          .status(AppStatusCode.INTERNAL_ERROR_CODE)
          .json({ success: false, message: AppError.UNKNOWN_ERROR });
      }
    }
  }

  async siginLawyer(
    req: Request,
    res: Response,
    cookieTokenService: ICookieTokenService,
  ) {
    try {
      const { lawyerDetails, accessToken, refreshToken } =
        await this._lawyerSigninApplication.execute(
          req.body.email,
          req.body.password,
        );
      cookieTokenService.setAuthCookie(res, accessToken, refreshToken);
      res.status(AppStatusCode.SUCCESS_CODE).json({
        success: true,
        message: "Login successfully",
        data: lawyerDetails,
      });
    } catch (error) {
      if (error instanceof AppException) {
        res
          .status(error.statusCode)
          .json({ success: false, message: error.message });
      } else {
        res
          .status(AppStatusCode.INTERNAL_ERROR_CODE)
          .json({ success: false, message: AppError.UNKNOWN_ERROR });
      }
    }
  }

  async logout(req: Request, res: Response) {
    try {
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res
        .status(AppStatusCode.SUCCESS_CODE)
        .json({ success: true, message: "Logout successfully" });
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      await this._lawyerForgotPasswordApplication.execute(req.body.email);
      res.status(AppStatusCode.SUCCESS_CODE).json({
        success: true,
        message: "Reset password link has sent to your email",
      });
    } catch (error) {
      if (error instanceof AppException) {
        res
          .status(error.statusCode)
          .json({ success: false, message: error.message });
      } else {
        res
          .status(AppStatusCode.INTERNAL_ERROR_CODE)
          .json({ success: false, message: AppError.UNKNOWN_ERROR });
      }
    }
  }

  async changePassword(req: Request, res: Response) {
    try {
      await this._lawyerChangePasswordApplication.changePassword(
        req.body.email,
        req.body.password,
        req.body.token,
      );
      res
        .status(AppStatusCode.SUCCESS_CODE)
        .json({ success: true, message: "Password changed successfully" });
    } catch (error) {
      if (error instanceof AppException) {
        res
          .status(error.statusCode)
          .json({ success: false, message: error.message });
      } else {
        if (error instanceof jwt.JsonWebTokenError) {
          res
            .status(AppStatusCode.UNAUTHORIZED)
            .json({ success: false, message: "Invalid token" });
        }
        res
          .status(AppStatusCode.INTERNAL_ERROR_CODE)
          .json({ success: false, message: AppError.UNKNOWN_ERROR });
      }
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      await this._lawyerResetPasswordApplication.resetPassword(
        req.body.email,
        req.body.oldPassword,
        req.body.newPassword,
      );
      res
        .status(AppStatusCode.SUCCESS_CODE)
        .json({ success: true, message: "Password changed successfully" });
    } catch (error) {
      if (error instanceof AppException) {
        res
          .status(error.statusCode)
          .json({ success: false, message: error.message });
      } else {
        res
          .status(AppStatusCode.INTERNAL_ERROR_CODE)
          .json({ success: false, message: AppError.UNKNOWN_ERROR });
      }
    }
  }
}
