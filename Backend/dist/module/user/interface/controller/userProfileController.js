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
exports.UserProfileController = void 0;
const AppEnumError_1 = require("../../../../common/error/AppEnumError");
const AppStatusCode_1 = require("../../../../common/statusCode/AppStatusCode");
class UserProfileController {
  constructor(_userAddProfileApplication, _userGetProfile, _editUserProfile) {
    this._userAddProfileApplication = _userAddProfileApplication;
    this._userGetProfile = _userGetProfile;
    this._editUserProfile = _editUserProfile;
  }
  /**
   * @async
   * @method addProfile
   * @param {Request} req The request object that contain profile details as body
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response with success message or error message
   */
  addProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      var _a;
      try {
        const imageUrl =
          (_a = req === null || req === void 0 ? void 0 : req.file) === null ||
          _a === void 0
            ? void 0
            : _a.path;
        yield this._userAddProfileApplication.execute(req.body, imageUrl);
        res
          .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
          .json({ success: true, message: "User profile added successfully" });
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
   * @method getUserProfile
   * @param {Request} req The request object with `userId` as params
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response with user profile details
   */
  getUserProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._userGetProfile.execute(req.params.userId);
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Profile found successfully",
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
   * @method editUserProfile
   * @param {Request} req The request object with user profile details as body
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response with success message or error message
   */
  editUserProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      var _a;
      try {
        const imageUrl =
          (_a = req === null || req === void 0 ? void 0 : req.file) === null ||
          _a === void 0
            ? void 0
            : _a.path;
        const result = yield this._editUserProfile.execute(
          req.body.userId,
          req.body,
          imageUrl,
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Profile edited successfully",
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
}
exports.UserProfileController = UserProfileController;
