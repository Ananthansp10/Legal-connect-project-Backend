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
exports.AdminAuthController = void 0;
const AppStatusCode_1 = require("../../../../../common/statusCode/AppStatusCode");
const errorException_1 = require("../../../../../common/error/errorException");
const AppEnumError_1 = require("../../../../../common/error/AppEnumError");
class AdminAuthController {
  constructor(_adminSigninApplication, _tokenCookieService) {
    this._adminSigninApplication = _adminSigninApplication;
    this._tokenCookieService = _tokenCookieService;
  }
  signin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const { accessToken, refreshToken } =
          yield this._adminSigninApplication.execute(req.body);
        this._tokenCookieService.setAuthCookie(res, accessToken, refreshToken);
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Login successfully",
          data: { name: "admin" },
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
}
exports.AdminAuthController = AdminAuthController;
