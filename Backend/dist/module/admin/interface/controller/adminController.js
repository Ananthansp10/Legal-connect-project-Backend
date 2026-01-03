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
exports.AdminController = void 0;
const AppEnumError_1 = require("../../../../common/error/AppEnumError");
const AppStatusCode_1 = require("../../../../common/statusCode/AppStatusCode");
const mongoose_1 = __importDefault(require("mongoose"));
const errorException_1 = require("../../../../common/error/errorException");
class AdminController {
  constructor(
    _getAppointmentsUseCase,
    _getReportedAccountUseCase,
    _updateReportedAccountUseCase,
    _addPlanUseCase,
    _editPlanUseCase,
    _managePlanStatusUseCase,
    _deletePlanUseCase,
    _getPlanUseCase,
    _getSummaryReportUseCase,
    _getReportsUseCase,
    _searchAppointmentUseCase,
    _getPlanSummaryReportUseCase,
    _searchPlanUseCase,
  ) {
    this._getAppointmentsUseCase = _getAppointmentsUseCase;
    this._getReportedAccountUseCase = _getReportedAccountUseCase;
    this._updateReportedAccountUseCase = _updateReportedAccountUseCase;
    this._addPlanUseCase = _addPlanUseCase;
    this._editPlanUseCase = _editPlanUseCase;
    this._managePlanStatusUseCase = _managePlanStatusUseCase;
    this._deletePlanUseCase = _deletePlanUseCase;
    this._getPlanUseCase = _getPlanUseCase;
    this._getSummaryReportUseCase = _getSummaryReportUseCase;
    this._getReportsUseCase = _getReportsUseCase;
    this._searchAppointmentUseCase = _searchAppointmentUseCase;
    this._getPlanSummaryReportUseCase = _getPlanSummaryReportUseCase;
    this._searchPlanUseCase = _searchPlanUseCase;
  }
  getAppointments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._getAppointmentsUseCase.execute(
          req.params.appointmentStatus,
          parseInt(req.params.startIndex),
          parseInt(req.params.limit),
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Appointments found successfully",
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
  getReportedAccounts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._getReportedAccountUseCase.execute(
          req.params.userType == "All"
            ? req.params.userType
            : req.params.userType
                .toLowerCase()
                .slice(0, req.params.userType.length - 1),
          parseInt(req.params.startIndex),
          parseInt(req.params.limit),
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Reported Accounts found successfully",
          data:
            result === null || result === void 0
              ? void 0
              : result.reportedAccounts,
          totalReportedAccounts:
            result === null || result === void 0
              ? void 0
              : result.totalReportedAccounts,
        });
      } catch (_error) {
        console.log(_error);
        res.status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE).json({
          success: false,
          message: AppEnumError_1.AppError.UNKNOWN_ERROR,
        });
      }
    });
  }
  updateReportedAccountStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this._updateReportedAccountUseCase.execute(
          new mongoose_1.default.Types.ObjectId(req.params.reportedAccountId),
        );
        res
          .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
          .json({ success: true, message: "Updated Reported Account" });
      } catch (_error) {
        res.status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE).json({
          success: false,
          message: AppEnumError_1.AppError.UNKNOWN_ERROR,
        });
      }
    });
  }
  addPlan(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this._addPlanUseCase.execute(req.body);
        res
          .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
          .json({ success: true, message: "Plan added successfully" });
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
  editPlan(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this._editPlanUseCase.execute(
          new mongoose_1.default.Types.ObjectId(req.params.planId),
          req.body,
        );
        res
          .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
          .json({ success: true, message: "Plan updated successfully" });
      } catch (_error) {
        res.status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE).json({
          success: false,
          message: AppEnumError_1.AppError.UNKNOWN_ERROR,
        });
      }
    });
  }
  managePlanStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this._managePlanStatusUseCase.execute(
          new mongoose_1.default.Types.ObjectId(req.params.planId),
          req.params.status,
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message:
            req.params.status == "Activate"
              ? "Plan Activated"
              : "Plan Deactivated",
        });
      } catch (_error) {
        res.status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE).json({
          success: false,
          message: AppEnumError_1.AppError.UNKNOWN_ERROR,
        });
      }
    });
  }
  DeletePlanUseCase(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this._deletePlanUseCase.execute(
          new mongoose_1.default.Types.ObjectId(req.params.planId),
        );
        res
          .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
          .json({ success: true, message: "Plan deleted successfully" });
      } catch (_error) {
        res.status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE).json({
          success: false,
          message: AppEnumError_1.AppError.UNKNOWN_ERROR,
        });
      }
    });
  }
  getPlans(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._getPlanUseCase.execute();
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          messgae: "Plans found successfully",
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
  getSummaryReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._getSummaryReportUseCase.execute();
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Summary report found successfully",
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
  getReports(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._getReportsUseCase.execute(
          req.params.revenueDateRange,
          req.params.specializationType,
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Reports found successfully",
          data: result,
        });
      } catch (error) {
        console.log(error);
        res.status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE).json({
          success: false,
          message: AppEnumError_1.AppError.UNKNOWN_ERROR,
        });
      }
    });
  }
  searchAppointments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        let result = yield this._searchAppointmentUseCase.execute(
          req.params.name,
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Appointment found successfully",
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
  getPlanSummaryReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        let result = yield this._getPlanSummaryReportUseCase.execute();
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Data found successfully",
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
  searchPlan(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        let result = yield this._searchPlanUseCase.execute(req.params.planName);
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Data found successfully",
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
exports.AdminController = AdminController;
