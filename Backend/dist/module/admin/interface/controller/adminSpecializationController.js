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
exports.AdminSpecializationController = void 0;
const AppEnumError_1 = require("../../../../common/error/AppEnumError");
const AppStatusCode_1 = require("../../../../common/statusCode/AppStatusCode");
class AdminSpecializationController {
  constructor(
    _addSpecializationApplication,
    _getSpecializationApplication,
    _editSpecializationApplication,
    _deleteSpecializationApplication,
  ) {
    this._addSpecializationApplication = _addSpecializationApplication;
    this._getSpecializationApplication = _getSpecializationApplication;
    this._editSpecializationApplication = _editSpecializationApplication;
    this._deleteSpecializationApplication = _deleteSpecializationApplication;
  }
  addSpecialization(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this._addSpecializationApplication.execute(req.body);
        res
          .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
          .json({
            success: true,
            message: "Specialization added successfully",
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
  getSpecialization(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._getSpecializationApplication.execute(
          parseInt(req.params.startIndex),
          parseInt(req.params.limit),
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Specialization data found successfully",
          data:
            result === null || result === void 0
              ? void 0
              : result.specializations,
          totalSpecialization:
            result === null || result === void 0
              ? void 0
              : result.totalSpecializations,
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
  editSpecialization(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this._editSpecializationApplication.execute(req.body.specId, {
          name: req.body.name,
          description: req.body.description,
          isDeleted: req.body.isDeleted,
        });
        res
          .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
          .json({
            success: true,
            message: "Specialization edited successfully",
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
  DeleteSpecializationApplication(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this._deleteSpecializationApplication.execute(req.params.specId);
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Specialization deleted successfully",
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
exports.AdminSpecializationController = AdminSpecializationController;
