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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.LawyerAuthController = void 0;
const AppStatusCode_1 = require("../../../../../common/statusCode/AppStatusCode");
const errorException_1 = require("../../../../../common/error/errorException");
const AppEnumError_1 = require("../../../../../common/error/AppEnumError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LawyerAuthController {
  constructor(
    _lawyerSignupApplication,
    _lawyerSigninApplication,
    _lawyerForgotPasswordApplication,
    _lawyerChangePasswordApplication,
    _lawyerResetPasswordApplication,
  ) {
    this._lawyerSignupApplication = _lawyerSignupApplication;
    this._lawyerSigninApplication = _lawyerSigninApplication;
    this._lawyerForgotPasswordApplication = _lawyerForgotPasswordApplication;
    this._lawyerChangePasswordApplication = _lawyerChangePasswordApplication;
    this._lawyerResetPasswordApplication = _lawyerResetPasswordApplication;
  }
  registerLawyer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      var _a;
      try {
        const imageUrl =
          (_a = req === null || req === void 0 ? void 0 : req.files) === null ||
          _a === void 0
            ? void 0
            : _a.map((file) => file.path);
        const requestObj = Object.assign(Object.assign({}, req.body), {
          documents: imageUrl,
        });
        const result =
          yield this._lawyerSignupApplication.registerLawyer(requestObj);
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Lawyer registered successfully",
          data: result,
        });
      } catch (error) {
        console.log(error);
        if (error instanceof errorException_1.AppException) {
          res
            .status(error.statusCode)
            .json({ success: false, message: error.message });
        } else {
          res
            .status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE)
            .json({
              success: false,
              message: AppEnumError_1.AppError.UNKNOWN_ERROR,
            });
        }
      }
    });
  }
  siginLawyer(req, res, cookieTokenService) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const { lawyerDetails, accessToken, refreshToken } =
          yield this._lawyerSigninApplication.execute(
            req.body.email,
            req.body.password,
          );
        cookieTokenService.setAuthCookie(res, accessToken, refreshToken);
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Login successfully",
          data: lawyerDetails,
        });
      } catch (error) {
        if (error instanceof errorException_1.AppException) {
          res
            .status(error.statusCode)
            .json({ success: false, message: error.message });
        } else {
          res
            .status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE)
            .json({
              success: false,
              message: AppEnumError_1.AppError.UNKNOWN_ERROR,
            });
        }
      }
    });
  }
  logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
          .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
          .json({ success: true, message: "Logout successfully" });
      } catch (_error) {
        res
          .status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE)
          .json({
            success: false,
            message: AppEnumError_1.AppError.UNKNOWN_ERROR,
          });
      }
    });
  }
  forgotPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this._lawyerForgotPasswordApplication.execute(req.body.email);
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Reset password link has sent to your email",
        });
      } catch (error) {
        if (error instanceof errorException_1.AppException) {
          res
            .status(error.statusCode)
            .json({ success: false, message: error.message });
        } else {
          res
            .status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE)
            .json({
              success: false,
              message: AppEnumError_1.AppError.UNKNOWN_ERROR,
            });
        }
      }
    });
  }
  changePassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this._lawyerChangePasswordApplication.changePassword(
          req.body.email,
          req.body.password,
          req.body.token,
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
          if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            res
              .status(AppStatusCode_1.AppStatusCode.UNAUTHORIZED)
              .json({ success: false, message: "Invalid token" });
          }
          res
            .status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE)
            .json({
              success: false,
              message: AppEnumError_1.AppError.UNKNOWN_ERROR,
            });
        }
      }
    });
  }
  resetPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this._lawyerResetPasswordApplication.resetPassword(
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
          res
            .status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE)
            .json({
              success: false,
              message: AppEnumError_1.AppError.UNKNOWN_ERROR,
            });
        }
      }
    });
  }
}
exports.LawyerAuthController = LawyerAuthController;
