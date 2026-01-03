"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthController = void 0;
const errorException_1 = require("../../../../../common/error/errorException");
const AppEnumError_1 = require("../../../../../common/error/AppEnumError");
const AppStatusCode_1 = require("../../../../../common/statusCode/AppStatusCode");
class UserAuthController {
  constructor(
    _userSignupApplication,
    _otpVerificationApplication,
    _resendOtpApplication,
    _forgotPasswordApplication,
    _changePassword,
    _userSigninAplication,
    _googleAuthApplication,
    _resetPasswordApplication,
  ) {
    this._userSignupApplication = _userSignupApplication;
    this._otpVerificationApplication = _otpVerificationApplication;
    this._resendOtpApplication = _resendOtpApplication;
    this._forgotPasswordApplication = _forgotPasswordApplication;
    this._changePassword = _changePassword;
    this._userSigninAplication = _userSigninAplication;
    this._googleAuthApplication = _googleAuthApplication;
    this._resetPasswordApplication = _resetPasswordApplication;
  }
  /**
   * @async
   * @method registerUser
   * @param {Request} req The request object with register details as body
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response with success message or error message
   */
  registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._userSignupApplication.registerUser(req.body);
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "OTP has successfully send to your email",
          data: result,
        });
      } catch (error) {
        if (error instanceof errorException_1.AppException) {
          res
            .status(error.statusCode)
            .json({ success: false, message: error.message });
        } else {
          res.status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE).json({
            success: false,
            message: AppEnumError_1.AppError.UNKNOWN_ERROR,
          });
        }
      }
    });
  }
  /**
   * @async
   * @method verifyOtp
   * @param {Request} req The request object with email and otp as body
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response with success mssage or error message
   */
  verifyOtp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this._otpVerificationApplication.verifyOtp(
          req.body.userDetails.email,
          req.body.otp,
        );
        res
          .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
          .json({ success: true, message: "OTP verified successfully" });
      } catch (error) {
        if (error instanceof errorException_1.AppException) {
          res
            .status(error.statusCode)
            .json({ success: false, message: error.message });
        } else {
          res.status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE).json({
            success: false,
            message: AppEnumError_1.AppError.UNKNOWN_ERROR,
          });
        }
      }
    });
  }
  /**
   * @async
   * @method resendOtp
   * @param {Request} req The request object with email as body
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response with success message or error message
   */
  resendOtp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this._resendOtpApplication.resendOtp(req.body.email);
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "OTP send successfully to your email",
        });
      } catch (_error) {
        res.status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE).json({
          success: false,
          message: AppEnumError_1.AppError.UNKNOWN_ERROR,
        });
      }
    });
  }
  /**
   * @async
   * @method forgotPassword
   * @param {Request} req The request object with email as body
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response with otp
   */
  forgotPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._forgotPasswordApplication.execute(
          req.body.email,
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "OTP send successfully to your email",
          data: result,
        });
      } catch (_error) {
        res.status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE).json({
          success: false,
          message: AppEnumError_1.AppError.UNKNOWN_ERROR,
        });
      }
    });
  }
  /**
   * @async
   * @method changePassword
   * @param {Request} req The request object with email and password as body
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response with success message or error message
   */
  changePassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this._changePassword.changePassword(
          req.body.email,
          req.body.password,
        );
        res
          .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
          .json({ success: true, message: "Password changed successfully" });
      } catch (_error) {
        res.status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE).json({
          success: false,
          message: AppEnumError_1.AppError.UNKNOWN_ERROR,
        });
      }
    });
  }
  /**
   * @async
   * @method sigin
   * @param {Request} req The request object with email and password as body
   * @param {Response} res The response object
   * @param cookieTokenService To store jwt token in cookie
   * @returns {Promise<void>} The json response with success message or error message
   */
  signin(req, res, cookieTokenService) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const { userData, accessToken, refreshToken } =
          yield this._userSigninAplication.execute(
            req.body.email,
            req.body.password,
          );
        cookieTokenService.setAuthCookie(res, accessToken, refreshToken);
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "User login successfully",
          user: userData,
        });
      } catch (error) {
        if (error instanceof errorException_1.AppException) {
          res
            .status(error.statusCode)
            .json({ success: false, message: error.message });
        } else {
          res.status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE).json({
            success: false,
            message: AppEnumError_1.AppError.UNKNOWN_ERROR,
          });
        }
      }
    });
  }
  /**
   * @async
   * @param {Request} req The request object
   * @param res The response object
   * @param cookieTokenService To store jwt token in cookie
   * @returns {Promise<void>} The json response with success message or error message
   */
  googleAuthentication(req, res, cookieTokenService) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const { userData, accessToken, refreshToken } =
          yield this._googleAuthApplication.execute(req.user);
        cookieTokenService.setAuthCookie(res, accessToken, refreshToken);
        res.cookie("googleAuthDetails", userData);
        res.redirect("http://localhost:5173/user-dashboard");
      } catch (error) {
        if (error instanceof errorException_1.AppException) {
          if (error.message == AppEnumError_1.AppError.USER_ALREADY_EXISTS) {
            res.redirect("http://localhost:5173/emailExist");
          } else {
            res.redirect("http://localhost:5173/block-page");
          }
        } else {
          res.status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE).json({
            success: false,
            message: AppEnumError_1.AppError.UNKNOWN_ERROR,
          });
        }
      }
    });
  }
  /**
   * @async
   * @method logout
   * @param {Request} req The request object
   * @param res The response object
   * @returns {Promise<void>} The json response with success message or error message
   */
  logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      var _a;
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
        if (
          (_a = req === null || req === void 0 ? void 0 : req.cookies) ===
            null || _a === void 0
            ? void 0
            : _a.googleAuthDetails
        ) {
          res.clearCookie("googleAuthDetails");
        }
        res
          .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
          .json({ success: true, message: "Logout successfully" });
      } catch (_error) {
        res.status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE).json({
          success: false,
          message: AppEnumError_1.AppError.UNKNOWN_ERROR,
        });
      }
    });
  }
  /**
   * @async
   * @method getGoogleAuthDetails
   * @param {Request} req The request object
   * @param res The response object
   * @returns {Promise<void>} The json response with google authentication details
   */
  getGoogleAuthDetails(req, res) {
    var _a;
    try {
      const data =
        (_a = req === null || req === void 0 ? void 0 : req.cookies) === null ||
        _a === void 0
          ? void 0
          : _a.googleAuthDetails;
      res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
        success: true,
        message: "Data found successfully",
        result: data,
      });
    } catch (_error) {
      res.status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE).json({
        success: false,
        message: AppEnumError_1.AppError.UNKNOWN_ERROR,
      });
    }
  }
  /**
   * @async
   * @method resetPassword
   * @param {Request} req The request object with email,old password,new password as body
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response with success message or error message
   */
  resetPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this._resetPasswordApplication.execute(
          req.body.email,
          req.body.oldPassword,
          req.body.newPassword,
        );
        res
          .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
          .json({ success: true, message: "Password changed successfully" });
      } catch (error) {
        if (error instanceof errorException_1.AppException) {
          res
            .status(error.statusCode)
            .json({ success: false, message: error.message });
        } else {
          res.status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE).json({
            success: false,
            message: AppEnumError_1.AppError.UNKNOWN_ERROR,
          });
        }
      }
    });
  }
}
exports.UserAuthController = UserAuthController;
