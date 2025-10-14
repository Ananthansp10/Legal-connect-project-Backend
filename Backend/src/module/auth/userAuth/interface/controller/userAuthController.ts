import { IUserSignupUseCase } from "../../application/use-case-Interface/IUserSignupUseCase";
import { Request, Response } from "express";
import { IUserSignup } from "../../domain/userRegisterEntity";
import { AppException } from "../../../../../common/error/errorException";
import { AppError } from "../../../../../common/error/AppEnumError";
import { IOtpVerificationUseCase } from "../../application/use-case-Interface/IOtpVerificationUseCase";
import { AppStatusCode } from "../../../../../common/statusCode/AppStatusCode";
import { IResendOtpUseCase } from "../../application/use-case-Interface/IResendOtpUseCase";
import { IForgotPasswordUseCase } from "../../application/use-case-Interface/IforgotPasswordUseCase";
import { IChangePasswordUseCase } from "../../application/use-case-Interface/IchangePasswordUseCase";
import { IUserSigninUseCase } from "../../application/use-case-Interface/IUserSigninUseCase";
import { ICookieTokenService } from "../../infrastructure/services/IcookieTokenService";
import { IUserSigninDto } from "../../domain/dto/userSigninDto";
import { IGoogleAuthUseCase } from "../../application/use-case-Interface/IgoogleAuthUseCase";
import { IGoogleAuthEntity } from "../../domain/googleAuthEntity";
import { IResetPasswordUseCase } from "../../application/use-case-Interface/IresetPasswordUseCase";

export class UserAuthController {
  constructor(
    private _userSignupApplication: IUserSignupUseCase,
    private _otpVerificationApplication: IOtpVerificationUseCase,
    private _resendOtpApplication: IResendOtpUseCase,
    private _forgotPasswordApplication: IForgotPasswordUseCase,
    private _changePassword: IChangePasswordUseCase,
    private _userSigninAplication: IUserSigninUseCase,
    private _googleAuthApplication: IGoogleAuthUseCase,
    private _resetPasswordApplication: IResetPasswordUseCase,
  ) {}
  /**
   * @async
   * @method registerUser
   * @param {Request} req The request object with register details as body
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response with success message or error message
   */
  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const result: Omit<
        IUserSignup,
        "isBlock" | "isActive" | "password"
      > | null = await this._userSignupApplication.registerUser(req.body);
      res.status(AppStatusCode.SUCCESS_CODE).json({
        success: true,
        message: "OTP has successfully send to your email",
        data: result,
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
  /**
   * @async
   * @method verifyOtp
   * @param {Request} req The request object with email and otp as body
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response with success mssage or error message
   */
  async verifyOtp(req: Request, res: Response): Promise<void> {
    try {
      await this._otpVerificationApplication.verifyOtp(
        req.body.userDetails.email,
        req.body.otp,
      );
      res
        .status(AppStatusCode.SUCCESS_CODE)
        .json({ success: true, message: "OTP verified successfully" });
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
  /**
   * @async
   * @method resendOtp
   * @param {Request} req The request object with email as body
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response with success message or error message
   */
  async resendOtp(req: Request, res: Response): Promise<void> {
    try {
      await this._resendOtpApplication.resendOtp(req.body.email);
      res.status(AppStatusCode.SUCCESS_CODE).json({
        success: true,
        message: "OTP send successfully to your email",
      });
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }
  /**
   * @async
   * @method forgotPassword
   * @param {Request} req The request object with email as body
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response with otp
   */
  async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const result = await this._forgotPasswordApplication.execute(
        req.body.email,
      );
      res.status(AppStatusCode.SUCCESS_CODE).json({
        success: true,
        message: "OTP send successfully to your email",
        data: result,
      });
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }
  /**
   * @async
   * @method changePassword
   * @param {Request} req The request object with email and password as body
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response with success message or error message
   */
  async changePassword(req: Request, res: Response): Promise<void> {
    try {
      await this._changePassword.changePassword(
        req.body.email,
        req.body.password,
      );
      res
        .status(AppStatusCode.SUCCESS_CODE)
        .json({ success: true, message: "Password changed successfully" });
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }
  /**
   * @async
   * @method sigin
   * @param {Request} req The request object with email and password as body
   * @param {Response} res The response object
   * @param cookieTokenService To store jwt token in cookie
   * @returns {Promise<void>} The json response with success message or error message
   */
  async signin(
    req: Request,
    res: Response,
    cookieTokenService: ICookieTokenService,
  ): Promise<void> {
    try {
      const { userData, accessToken, refreshToken }: IUserSigninDto =
        await this._userSigninAplication.execute(
          req.body.email,
          req.body.password,
        );
      cookieTokenService.setAuthCookie(res, accessToken, refreshToken);
      res.status(AppStatusCode.SUCCESS_CODE).json({
        success: true,
        message: "User login successfully",
        user: userData,
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
  /**
   * @async
   * @param {Request} req The request object
   * @param res The response object
   * @param cookieTokenService To store jwt token in cookie
   * @returns {Promise<void>} The json response with success message or error message
   */
  async googleAuthentication(
    req: Request,
    res: Response,
    cookieTokenService: ICookieTokenService,
  ): Promise<void> {
    try {
      const { userData, accessToken, refreshToken }: IUserSigninDto =
        await this._googleAuthApplication.execute(
          req.user as IGoogleAuthEntity,
        );
      cookieTokenService.setAuthCookie(res, accessToken, refreshToken);
      res.cookie("googleAuthDetails", userData);
      res.redirect("http://localhost:5173/user-dashboard");
    } catch (error) {
      if (error instanceof AppException) {
        if (error.message == AppError.USER_ALREADY_EXISTS) {
          res.redirect("http://localhost:5173/emailExist");
        } else {
          res.redirect("http://localhost:5173/block-page");
        }
      } else {
        res
          .status(AppStatusCode.INTERNAL_ERROR_CODE)
          .json({ success: false, message: AppError.UNKNOWN_ERROR });
      }
    }
  }
  /**
   * @async
   * @method logout
   * @param {Request} req The request object
   * @param res The response object
   * @returns {Promise<void>} The json response with success message or error message
   */
  async logout(req: Request, res: Response): Promise<void> {
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
      if (req?.cookies?.googleAuthDetails) {
        res.clearCookie("googleAuthDetails");
      }
      res
        .status(AppStatusCode.SUCCESS_CODE)
        .json({ success: true, message: "Logout successfully" });
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }
  /**
   * @async
   * @method getGoogleAuthDetails
   * @param {Request} req The request object
   * @param res The response object
   * @returns {Promise<void>} The json response with google authentication details
   */
  getGoogleAuthDetails(req: Request, res: Response) {
    try {
      const data: IGoogleAuthEntity | null = req?.cookies?.googleAuthDetails;
      res.status(AppStatusCode.SUCCESS_CODE).json({
        success: true,
        message: "Data found successfully",
        result: data,
      });
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }
  /**
   * @async
   * @method resetPassword
   * @param {Request} req The request object with email,old password,new password as body
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response with success message or error message
   */
  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      await this._resetPasswordApplication.execute(
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
