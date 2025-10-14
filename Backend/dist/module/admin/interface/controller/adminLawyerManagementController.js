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
exports.AdminLawyerManagementController = void 0;
const AppStatusCode_1 = require("../../../../common/statusCode/AppStatusCode");
const AppEnumError_1 = require("../../../../common/error/AppEnumError");
const mongoose_1 = __importDefault(require("mongoose"));
class AdminLawyerManagementController {
  constructor(
    _verifyLawyerApplication,
    _getUnverifiedLawyerApplication,
    _getLawyersApplication,
    _verifyLawyerStatusApplication,
    _searchLawyerUseCase,
    _filterLawyerUseCase,
    _getLawyerProfileDataUseCase,
  ) {
    this._verifyLawyerApplication = _verifyLawyerApplication;
    this._getUnverifiedLawyerApplication = _getUnverifiedLawyerApplication;
    this._getLawyersApplication = _getLawyersApplication;
    this._verifyLawyerStatusApplication = _verifyLawyerStatusApplication;
    this._searchLawyerUseCase = _searchLawyerUseCase;
    this._filterLawyerUseCase = _filterLawyerUseCase;
    this._getLawyerProfileDataUseCase = _getLawyerProfileDataUseCase;
  }
  getUnverifiedLawyers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._getUnverifiedLawyerApplication.execute();
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Data found successfully",
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
  verifyLawyer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._verifyLawyerApplication.execute(
          req.params.lawyerId,
          req.params.status,
          req.params.reason,
        );
        if (result) {
          res
            .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
            .json({ success: true, message: "Lawyer Approved successfully" });
        } else {
          res
            .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
            .json({ success: true, message: "Lawyer rejected successfully" });
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
  getLawyers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._getLawyersApplication.execute(
          parseInt(req.query.page),
          parseInt(req.query.limit),
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
  verifyLawyerStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._verifyLawyerStatusApplication.execute(
          req.params.lawyerId,
          req.params.status,
        );
        if (result) {
          res
            .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
            .json({ success: true, message: "Lawyer blocked successfully" });
        } else {
          res
            .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
            .json({ success: true, message: "Lawyer unblock successfully" });
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
  searchLawyer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._searchLawyerUseCase.execute(req.params.name);
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
  filterLawyer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._filterLawyerUseCase.execute(
          req.params.status,
        );
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
  getLawyerProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._getLawyerProfileDataUseCase.execute(
          new mongoose_1.default.Types.ObjectId(req.params.lawyerId),
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Lawyer profile found successfully",
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
exports.AdminLawyerManagementController = AdminLawyerManagementController;
