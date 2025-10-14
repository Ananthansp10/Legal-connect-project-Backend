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
exports.UserController = void 0;
const AppEnumError_1 = require("../../../../common/error/AppEnumError");
const AppStatusCode_1 = require("../../../../common/statusCode/AppStatusCode");
const mongoose_1 = __importDefault(require("mongoose"));
const errorException_1 = require("../../../../common/error/errorException");
class UserController {
  constructor(
    _getLawyerApplication,
    _getLawyerDetailsApplication,
    _getLawyerSlotApplication,
    _filterLawyerApplication,
    _searchLawyerApplication,
    _bookAppointmentApplication,
    _getAppointmentApplication,
    _cancelAppointmentUseCase,
    _getTodaysAppointmentUseCase,
    _resheduleAppointmentUseCase,
    _reportLawyerUseCase,
    _getUserChatUseCase,
    _getUserAllChatsUseCase,
    _getLawyerChatProfileUseCase,
    _addReviewUseCase,
    _getReviewUseCase,
  ) {
    this._getLawyerApplication = _getLawyerApplication;
    this._getLawyerDetailsApplication = _getLawyerDetailsApplication;
    this._getLawyerSlotApplication = _getLawyerSlotApplication;
    this._filterLawyerApplication = _filterLawyerApplication;
    this._searchLawyerApplication = _searchLawyerApplication;
    this._bookAppointmentApplication = _bookAppointmentApplication;
    this._getAppointmentApplication = _getAppointmentApplication;
    this._cancelAppointmentUseCase = _cancelAppointmentUseCase;
    this._getTodaysAppointmentUseCase = _getTodaysAppointmentUseCase;
    this._resheduleAppointmentUseCase = _resheduleAppointmentUseCase;
    this._reportLawyerUseCase = _reportLawyerUseCase;
    this._getUserChatUseCase = _getUserChatUseCase;
    this._getUserAllChatsUseCase = _getUserAllChatsUseCase;
    this._getLawyerChatProfileUseCase = _getLawyerChatProfileUseCase;
    this._addReviewUseCase = _addReviewUseCase;
    this._getReviewUseCase = _getReviewUseCase;
  }
  /**
   * @async
   * @method getLawyers
   * @param {Request} req The request object
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response containing the lawyers details list or error message
   */
  getLawyers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._getLawyerApplication.execute();
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Lawyers found successfully",
          data: result,
        });
      } catch (_error) {
        res
          .status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE)
          .json({ success: false, message: "Lawyers not found" });
      }
    });
  }
  /**
   * @async
   * @method getLawyerDetails
   * @param {Request} req The request object with `lawyerId` as params
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response containing the lawyer details or error message
   */
  getLawyerDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        let result = yield this._getLawyerDetailsApplication.execute(
          req.params.lawyerId,
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Lawyer Details found successfully",
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
  /**
   * @async
   * @method getSlotDetails
   * @param {Request} req The request object with `lawyerId` and date as params
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response containing time slots of lawyer for that date or error meesage
   */
  getSlotDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const timeSlots = yield this._getLawyerSlotApplication.execute(
          new mongoose_1.default.Types.ObjectId(req.params.lawyerId),
          req.params.date,
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Time slots found",
          timeSlots: timeSlots,
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
  /**
   * @async
   * @method filterLawyerBySpecialization
   * @param {Request} req The request object with `specialization` as params
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response conatining lawyers list matching the specialization or error message
   */
  filterLawyerBySpecialization(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._filterLawyerApplication.execute(
          req.params.specialization,
        );
        if (result) {
          res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
            success: true,
            message: "Data found successfully",
            data: result,
          });
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
  /**
   * @async
   * @method searchLawyerByName
   * @param {Request} req The request object with lawyer `name` as params
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response containing lawyers list matching the exact name or error message
   */
  searchLawyerByName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._searchLawyerApplication.execute(
          req.params.name,
        );
        if (result) {
          res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
            success: true,
            message: "Data found successfully",
            data: result,
          });
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
  /**
   * @async
   * @method bookAppointment
   * @param {Request} req The request object containing the appointment details in the body and `caseId` as params
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response with success message or error message
   */
  bookAppointment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this._bookAppointmentApplication.execute(
          req.body,
          req.params.caseId,
        );
        res
          .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
          .json({ success: true, message: "Appointment booked successfully" });
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
  /**
   * @async
   * @method getAppointment
   * @param {Request} req The request object containing `userId` and `appointmentStatus` as params and `startIndex` and `limit` as params for pagination
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response containing appointments list and total appointments for that appointment status or error message
   */
  getAppointment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._getAppointmentApplication.execute(
          new mongoose_1.default.Types.ObjectId(req.params.userId),
          req.params.appointmentStatus,
          parseInt(req.params.startIndex),
          parseInt(req.params.limit),
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Appointment found successfully",
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
            success: false,
            message: AppEnumError_1.AppError.UNKNOWN_ERROR,
          });
      }
    });
  }
  /**
   * @async
   * @method cancelAppointment
   * @param {Request} req The request object containing `appointmentId` as params
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response containing the success message or error message
   */
  cancelAppointment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this._cancelAppointmentUseCase.execute(
          new mongoose_1.default.Types.ObjectId(req.params.appointmentId),
        );
        res
          .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
          .json({
            success: true,
            message: "Appointment cancelled successfully",
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
  /**
   * @async
   * @method getTodaysAppointments
   * @param {Request} req The request object with `userId` as params
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response containing todays appointments list or error message
   */
  getTodaysAppointments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        let result = yield this._getTodaysAppointmentUseCase.execute(
          new mongoose_1.default.Types.ObjectId(req.params.userId),
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Todays appointments found",
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
  /**
   * @async
   * @method resheduleAppointment
   * @param {Request} req The request object with `appointmentId' as params
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response containing success message or error message
   */
  resheduleAppointment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this._resheduleAppointmentUseCase.execute(
          new mongoose_1.default.Types.ObjectId(req.params.appointmentId),
        );
        res
          .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
          .json({ success: true, message: "Appointment reshedule" });
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
  /**
   * @async
   * @method reportLawyer
   * @param {Request} req The request object with report details as body
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response with success message or error message
   */
  reportLawyer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this._reportLawyerUseCase.execute(req.body);
        res
          .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
          .json({ success: true, message: "Reported successfully" });
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
  /**
   * @async
   * @method getUserChat
   * @param {Request} req The request object with `userId` and `lawyerId` as params
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response containing user chat with that lawyer or error meessage
   */
  getUserChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._getUserChatUseCase.execute(
          new mongoose_1.default.Types.ObjectId(req.params.userId),
          new mongoose_1.default.Types.ObjectId(req.params.lawyerId),
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Message found successfully",
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
  /**
   * @async
   * @method getUserAllChats
   * @param {Request} req The request with `userId` as params
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response containing all chats of that user or error message
   */
  getUserAllChats(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._getUserAllChatsUseCase.execute(
          new mongoose_1.default.Types.ObjectId(req.params.userId),
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "User chat found successfully",
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
  /**
   * @async
   * @method getLawyerChatProfile
   * @param {Request} req The request object with `lawyerId` as params
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response containing lawyer chat profile details or error message
   */
  getLawyerChatProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._getLawyerChatProfileUseCase.execute(
          new mongoose_1.default.Types.ObjectId(req.params.lawyerId),
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Lawyer chat profile found successfully",
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
  /**
   * @async
   * @method addReview
   * @param {Request} req The request object `lawyerId` and review details as body
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response containing the success message or error message
   */
  addReview(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this._addReviewUseCase.execute(
          new mongoose_1.default.Types.ObjectId(req.params.lawyerId),
          req.body,
        );
        res
          .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
          .json({ success: true, message: "Review added successfully" });
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
  /**
   * @async
   * @method getReview
   * @param {Request} req The request object with `lawyerId` as params
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response containing review details or error message
   */
  getReview(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._getReviewUseCase.execute(
          new mongoose_1.default.Types.ObjectId(req.params.lawyerId),
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Review found successfully",
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
exports.UserController = UserController;
