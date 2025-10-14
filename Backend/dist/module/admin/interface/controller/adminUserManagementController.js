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
exports.AdminUserManagementController = void 0;
const AppEnumError_1 = require("../../../../common/error/AppEnumError");
const AppStatusCode_1 = require("../../../../common/statusCode/AppStatusCode");
const mongoose_1 = __importDefault(require("mongoose"));
class AdminUserManagementController {
  constructor(
    _getUserApplication,
    _verifyUserStatusApplication,
    _searchUserUseCase,
    _filterUserUseCase,
    _getUserProfileDataUseCase,
  ) {
    this._getUserApplication = _getUserApplication;
    this._verifyUserStatusApplication = _verifyUserStatusApplication;
    this._searchUserUseCase = _searchUserUseCase;
    this._filterUserUseCase = _filterUserUseCase;
    this._getUserProfileDataUseCase = _getUserProfileDataUseCase;
  }
  getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._getUserApplication.execute(
          parseInt(req.params.startIndex),
          parseInt(req.params.limit),
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Data found successfully",
          data: result.data,
          totalData: result.totalData,
        });
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
  verifyUserStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._verifyUserStatusApplication.execute(
          req.params.userId,
          req.params.status,
        );
        if (result) {
          res
            .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
            .json({ success: true, message: "User blocked successfully" });
        } else {
          res
            .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
            .json({ success: true, message: "User unblocked successfully" });
        }
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
  searchUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._searchUserUseCase.execute(req.params.name);
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Search data found successfully",
          data: result,
        });
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
  filterUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._filterUserUseCase.execute(req.params.status);
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Filtered data found successfully",
          data: result,
        });
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
  getUserProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._getUserProfileDataUseCase.execute(
          new mongoose_1.default.Types.ObjectId(req.params.userId),
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "User profile found successfully",
          data: result,
        });
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
exports.AdminUserManagementController = AdminUserManagementController;
