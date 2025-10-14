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
exports.LawyerController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AppEnumError_1 = require("../../../../common/error/AppEnumError");
const AppStatusCode_1 = require("../../../../common/statusCode/AppStatusCode");
const errorException_1 = require("../../../../common/error/errorException");
class LawyerController {
  constructor(
    _addSlotApplication,
    _getSlotApplication,
    _updateRuleStatusApplication,
    _getAppointmentUseCase,
    _updateAppointmentStatusUseCase,
    _getSubscriptionPlanUseCase,
    _addPlanUseCase,
    _getLawyerAllChatsUseCase,
    _getLawyerChatUseCase,
    _getUserChatProfileUseCase,
    _updateChatReadStatusUseCase,
    _addBankAccountDetailsUseCase,
    _getSummaryUseCase,
    _checkBankDetailsUseCase,
    _startMeetingUseCase,
    _addNotesUseCase,
    _addFeedBackUseCase,
    _getConsultationHistoryUseCase,
    _findStarterPlanUseCase,
    _searchAppointmentUseCase,
    _getPurchasedPlansUseCase,
  ) {
    this._addSlotApplication = _addSlotApplication;
    this._getSlotApplication = _getSlotApplication;
    this._updateRuleStatusApplication = _updateRuleStatusApplication;
    this._getAppointmentUseCase = _getAppointmentUseCase;
    this._updateAppointmentStatusUseCase = _updateAppointmentStatusUseCase;
    this._getSubscriptionPlanUseCase = _getSubscriptionPlanUseCase;
    this._addPlanUseCase = _addPlanUseCase;
    this._getLawyerAllChatsUseCase = _getLawyerAllChatsUseCase;
    this._getLawyerChatUseCase = _getLawyerChatUseCase;
    this._getUserChatProfileUseCase = _getUserChatProfileUseCase;
    this._updateChatReadStatusUseCase = _updateChatReadStatusUseCase;
    this._addBankAccountDetailsUseCase = _addBankAccountDetailsUseCase;
    this._getSummaryUseCase = _getSummaryUseCase;
    this._checkBankDetailsUseCase = _checkBankDetailsUseCase;
    this._startMeetingUseCase = _startMeetingUseCase;
    this._addNotesUseCase = _addNotesUseCase;
    this._addFeedBackUseCase = _addFeedBackUseCase;
    this._getConsultationHistoryUseCase = _getConsultationHistoryUseCase;
    this._findStarterPlanUseCase = _findStarterPlanUseCase;
    this._searchAppointmentUseCase = _searchAppointmentUseCase;
    this._getPurchasedPlansUseCase = _getPurchasedPlansUseCase;
  }
  addSlot(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this._addSlotApplication.execute(
          new mongoose_1.default.Types.ObjectId(req.params.lawyerId),
          req.body,
        );
        res
          .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
          .json({ success: true, message: "Slot addedd successfully" });
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
  getSlot(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._getSlotApplication.execute(
          new mongoose_1.default.Types.ObjectId(req.params.lawyerId),
          req.params.type,
        );
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
  updateRuleStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._updateRuleStatusApplication.execute(
          new mongoose_1.default.Types.ObjectId(req.params.ruleId),
          req.params.ruleStatus,
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: result == "true" ? "Rule has disabled" : "Rule has enabled",
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
  getAppointments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._getAppointmentUseCase.execute(
          new mongoose_1.default.Types.ObjectId(req.params.lawyerId),
          req.params.appointmentStatus,
          parseInt(req.params.startIndex),
          parseInt(req.params.limit),
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Appointments found successfully",
          data:
            result === null || result === void 0 ? void 0 : result.appointments,
          totalAppointments:
            result === null || result === void 0
              ? void 0
              : result.totalAppointments,
        });
      } catch (_error) {
        res
          .status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE)
          .json({
            status: false,
            message: AppEnumError_1.AppError.UNKNOWN_ERROR,
          });
      }
    });
  }
  updateAppointmentStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this._updateAppointmentStatusUseCase.execute(
          new mongoose_1.default.Types.ObjectId(req.params.appointmentId),
          req.params.appointmentStatus,
          new mongoose_1.default.Types.ObjectId(req.params.lawyerId),
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: `Appointment ${req.params.appointmentStatus} successfully`,
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
  getSubscriptionPlan(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._getSubscriptionPlanUseCase.execute();
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Subscription plan found",
          data: result,
        });
      } catch (_error) {
        res
          .status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE)
          .json({
            success: true,
            message: AppEnumError_1.AppError.UNKNOWN_ERROR,
          });
      }
    });
  }
  addPlan(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this._addPlanUseCase.execute(
          new mongoose_1.default.Types.ObjectId(req.params.lawyerId),
          new mongoose_1.default.Types.ObjectId(req.params.planId),
          req.params.price,
        );
        res
          .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
          .json({ success: true, message: "Subscription plan addedd" });
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
  getAllChats(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._getLawyerAllChatsUseCase.execute(
          new mongoose_1.default.Types.ObjectId(req.params.lawyerId),
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Lawyer all chats found successfully",
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
  getChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._getLawyerChatUseCase.execute(
          new mongoose_1.default.Types.ObjectId(req.params.lawyerId),
          new mongoose_1.default.Types.ObjectId(req.params.userId),
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Chat found successfully",
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
  getUserChatProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._getUserChatProfileUseCase.execute(
          new mongoose_1.default.Types.ObjectId(req.params.userId),
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "User chat profile found",
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
  updateChatReadStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this._updateChatReadStatusUseCase.execute(
          new mongoose_1.default.Types.ObjectId(req.params.lawyerId),
          new mongoose_1.default.Types.ObjectId(req.params.userId),
        );
        res
          .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
          .json({ success: true, message: "Chat read status updated" });
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
  addBankAccount(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this._addBankAccountDetailsUseCase.execute(req.body);
        res
          .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
          .json({ success: true, message: "Bank details added successfully" });
      } catch (_error) {
        res
          .status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE)
          .json({
            SUCCESS: false,
            MESSAGE: AppEnumError_1.AppError.UNKNOWN_ERROR,
          });
      }
    });
  }
  getSummary(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._getSummaryUseCase.execute(
          new mongoose_1.default.Types.ObjectId(req.params.lawyerId),
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Summary found successfully",
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
  checkBankDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._checkBankDetailsUseCase.execute(
          new mongoose_1.default.Types.ObjectId(req.params.lawyerId),
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: result ? true : false,
          message: result
            ? "Bank Details found successfully"
            : "Bank details not found",
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
  startMeeting(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this._startMeetingUseCase.execute(
          new mongoose_1.default.Types.ObjectId(req.params.appointmentId),
        );
        res
          .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
          .json({ success: true, message: "Appointment meeting started" });
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
  addNotes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this._addNotesUseCase.execute(
          new mongoose_1.default.Types.ObjectId(req.params.appointmentId),
          req.body.note,
        );
        res
          .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
          .json({ success: true, message: "Final notes summary added" });
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
  addReview(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this._addFeedBackUseCase.execute(
          new mongoose_1.default.Types.ObjectId(req.params.appointmentId),
          req.body,
        );
        res
          .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
          .json({ success: true, message: "Feedback added" });
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
  getConsultationHistory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        let result = yield this._getConsultationHistoryUseCase.execute(
          parseInt(req.params.caseId),
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Consultation history found successfully",
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
  findStarterPlan(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        let result = yield this._findStarterPlanUseCase.execute(
          new mongoose_1.default.Types.ObjectId(req.params.lawyerId),
        );
        res
          .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
          .json({ success: true, data: result });
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
  searchAppointment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._searchAppointmentUseCase.execute(
          new mongoose_1.default.Types.ObjectId(req.params.lawyerId),
          req.params.userName,
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Appointments found successfully",
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
  getPurchasedPlans(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._getPurchasedPlansUseCase.execute(
          new mongoose_1.default.Types.ObjectId(req.params.lawyerId),
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "purchased plans found successfully",
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
exports.LawyerController = LawyerController;
