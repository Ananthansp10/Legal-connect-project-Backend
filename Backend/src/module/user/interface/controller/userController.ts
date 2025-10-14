import { AppError } from "../../../../common/error/AppEnumError";
import { AppStatusCode } from "../../../../common/statusCode/AppStatusCode";
import { IGetLawyerResponse } from "../../application/mapper/getLawyerMapper";
import { IGetLawyerDetailsUseCase } from "../../application/use-case-interface/IGetLawyerDetailsUseCase";
import { IGetLawyerUseCase } from "../../application/use-case-interface/IGetLawyersUseCase";
import { Request, Response } from "express";
import { IGetLawyerSlotUseCase } from "../../application/use-case-interface/IGetLawyerSlotUseCase";
import { IFilterLawyerUseCase } from "../../application/use-case-interface/IFilterLawyerUseCase";
import { ISearchLawyerUseCase } from "../../application/use-case-interface/ISearchLawyerUseCase";
import { IBookAppointmentUseCase } from "../../application/use-case-interface/IBookAppointmentUseCase";
import mongoose from "mongoose";
import { IGetAppointmentUseCase } from "../../application/use-case-interface/IGetAppointmentUseCase";
import { ICancelAppointmentUseCase } from "../../application/use-case-interface/ICancelAppointmentUseCase";
import { AppException } from "../../../../common/error/errorException";
import { IGetTodaysAppointmentsUseCase } from "../../application/use-case-interface/IGetTodaysAppointmentUseCase";
import { IResheduleAppointmentUseCase } from "../../application/use-case-interface/IResheduleAppointmentUseCase";
import { IReportLawyerUseCase } from "../../application/use-case-interface/IReportLawyerUseCase";
import { IGetUserChatUseCase } from "../../application/use-case-interface/IGetUserChatUseCase";
import { IGetAllChatUseCase } from "../../application/use-case-interface/IGetAllChatUseCase";
import { IGetLawyerChatProfileUseCase } from "../../application/use-case-interface/IGetLawyerChatProfileUseCase";
import { IAddReviewUseCase } from "../../application/use-case-interface/IAddReviewUseCase";
import { IGetReviewUseCase } from "../../application/use-case-interface/IGetReviewUseCase";

export class UserController {
  constructor(
    private _getLawyerApplication: IGetLawyerUseCase,
    private _getLawyerDetailsApplication: IGetLawyerDetailsUseCase,
    private _getLawyerSlotApplication: IGetLawyerSlotUseCase,
    private _filterLawyerApplication: IFilterLawyerUseCase,
    private _searchLawyerApplication: ISearchLawyerUseCase,
    private _bookAppointmentApplication: IBookAppointmentUseCase,
    private _getAppointmentApplication: IGetAppointmentUseCase,
    private _cancelAppointmentUseCase: ICancelAppointmentUseCase,
    private _getTodaysAppointmentUseCase: IGetTodaysAppointmentsUseCase,
    private _resheduleAppointmentUseCase: IResheduleAppointmentUseCase,
    private _reportLawyerUseCase: IReportLawyerUseCase,
    private _getUserChatUseCase: IGetUserChatUseCase,
    private _getUserAllChatsUseCase: IGetAllChatUseCase,
    private _getLawyerChatProfileUseCase: IGetLawyerChatProfileUseCase,
    private _addReviewUseCase: IAddReviewUseCase,
    private _getReviewUseCase: IGetReviewUseCase,
  ) {}

  /**
   * @async
   * @method getLawyers
   * @param {Request} req The request object
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response containing the lawyers details list or error message
   */
  async getLawyers(req: Request, res: Response): Promise<void> {
    try {
      const result: IGetLawyerResponse[] | null =
        await this._getLawyerApplication.execute();
      res.status(AppStatusCode.SUCCESS_CODE).json({
        success: true,
        message: "Lawyers found successfully",
        data: result,
      });
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: "Lawyers not found" });
    }
  }
  /**
   * @async
   * @method getLawyerDetails
   * @param {Request} req The request object with `lawyerId` as params
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response containing the lawyer details or error message
   */
  async getLawyerDetails(req: Request, res: Response): Promise<void> {
    try {
      let result = await this._getLawyerDetailsApplication.execute(
        req.params.lawyerId,
      );
      res.status(AppStatusCode.SUCCESS_CODE).json({
        success: true,
        message: "Lawyer Details found successfully",
        data: result,
      });
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }
  /**
   * @async
   * @method getSlotDetails
   * @param {Request} req The request object with `lawyerId` and date as params
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response containing time slots of lawyer for that date or error meesage
   */
  async getSlotDetails(req: Request, res: Response): Promise<void> {
    try {
      const timeSlots = await this._getLawyerSlotApplication.execute(
        new mongoose.Types.ObjectId(req.params.lawyerId),
        req.params.date,
      );
      res.status(AppStatusCode.SUCCESS_CODE).json({
        success: true,
        message: "Time slots found",
        timeSlots: timeSlots,
      });
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }
  /**
   * @async
   * @method filterLawyerBySpecialization
   * @param {Request} req The request object with `specialization` as params
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response conatining lawyers list matching the specialization or error message
   */
  async filterLawyerBySpecialization(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const result = await this._filterLawyerApplication.execute(
        req.params.specialization,
      );
      if (result) {
        res.status(AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Data found successfully",
          data: result,
        });
      }
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }
  /**
   * @async
   * @method searchLawyerByName
   * @param {Request} req The request object with lawyer `name` as params
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response containing lawyers list matching the exact name or error message
   */
  async searchLawyerByName(req: Request, res: Response): Promise<void> {
    try {
      const result = await this._searchLawyerApplication.execute(
        req.params.name,
      );
      if (result) {
        res.status(AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Data found successfully",
          data: result,
        });
      }
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }
  /**
   * @async
   * @method bookAppointment
   * @param {Request} req The request object containing the appointment details in the body and `caseId` as params
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response with success message or error message
   */
  async bookAppointment(req: Request, res: Response): Promise<void> {
    try {
      await this._bookAppointmentApplication.execute(
        req.body,
        req.params.caseId,
      );
      res
        .status(AppStatusCode.SUCCESS_CODE)
        .json({ success: true, message: "Appointment booked successfully" });
    } catch (error) {
      if (error instanceof AppException) {
        res
          .status(error.statusCode)
          .json({ success: false, message: error.message });
      } else {
        res
          .status(AppStatusCode.INTERNAL_ERROR_CODE)
          .json({ success: false, message: AppError.UNKNOWN_ERROR });
      }
    }
  }
  /**
   * @async
   * @method getAppointment
   * @param {Request} req The request object containing `userId` and `appointmentStatus` as params and `startIndex` and `limit` as params for pagination
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response containing appointments list and total appointments for that appointment status or error message
   */
  async getAppointment(req: Request, res: Response): Promise<void> {
    try {
      const result = await this._getAppointmentApplication.execute(
        new mongoose.Types.ObjectId(req.params.userId),
        req.params.appointmentStatus,
        parseInt(req.params.startIndex),
        parseInt(req.params.limit),
      );
      res.status(AppStatusCode.SUCCESS_CODE).json({
        success: true,
        message: "Appointment found successfully",
        data: result?.appointments,
        totalAppointments: result?.totalAppointments,
      });
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }
  /**
   * @async
   * @method cancelAppointment
   * @param {Request} req The request object containing `appointmentId` as params
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response containing the success message or error message
   */
  async cancelAppointment(req: Request, res: Response): Promise<void> {
    try {
      await this._cancelAppointmentUseCase.execute(
        new mongoose.Types.ObjectId(req.params.appointmentId),
      );
      res
        .status(AppStatusCode.SUCCESS_CODE)
        .json({ success: true, message: "Appointment cancelled successfully" });
    } catch (error) {
      if (error instanceof AppException) {
        res
          .status(error.statusCode)
          .json({ success: false, message: error.message });
      } else {
        res
          .status(AppStatusCode.INTERNAL_ERROR_CODE)
          .json({ success: false, message: AppError.UNKNOWN_ERROR });
      }
    }
  }
  /**
   * @async
   * @method getTodaysAppointments
   * @param {Request} req The request object with `userId` as params
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response containing todays appointments list or error message
   */
  async getTodaysAppointments(req: Request, res: Response): Promise<void> {
    try {
      let result = await this._getTodaysAppointmentUseCase.execute(
        new mongoose.Types.ObjectId(req.params.userId),
      );
      res.status(AppStatusCode.SUCCESS_CODE).json({
        success: true,
        message: "Todays appointments found",
        data: result,
      });
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }
  /**
   * @async
   * @method resheduleAppointment
   * @param {Request} req The request object with `appointmentId' as params
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response containing success message or error message
   */
  async resheduleAppointment(req: Request, res: Response): Promise<void> {
    try {
      await this._resheduleAppointmentUseCase.execute(
        new mongoose.Types.ObjectId(req.params.appointmentId),
      );
      res
        .status(AppStatusCode.SUCCESS_CODE)
        .json({ success: true, message: "Appointment reshedule" });
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }
  /**
   * @async
   * @method reportLawyer
   * @param {Request} req The request object with report details as body
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response with success message or error message
   */
  async reportLawyer(req: Request, res: Response): Promise<void> {
    try {
      await this._reportLawyerUseCase.execute(req.body);
      res
        .status(AppStatusCode.SUCCESS_CODE)
        .json({ success: true, message: "Reported successfully" });
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }
  /**
   * @async
   * @method getUserChat
   * @param {Request} req The request object with `userId` and `lawyerId` as params
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response containing user chat with that lawyer or error meessage
   */
  async getUserChat(req: Request, res: Response): Promise<void> {
    try {
      const result = await this._getUserChatUseCase.execute(
        new mongoose.Types.ObjectId(req.params.userId),
        new mongoose.Types.ObjectId(req.params.lawyerId),
      );
      res.status(AppStatusCode.SUCCESS_CODE).json({
        success: true,
        message: "Message found successfully",
        data: result,
      });
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }
  /**
   * @async
   * @method getUserAllChats
   * @param {Request} req The request with `userId` as params
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response containing all chats of that user or error message
   */
  async getUserAllChats(req: Request, res: Response): Promise<void> {
    try {
      const result = await this._getUserAllChatsUseCase.execute(
        new mongoose.Types.ObjectId(req.params.userId),
      );
      res.status(AppStatusCode.SUCCESS_CODE).json({
        success: true,
        message: "User chat found successfully",
        data: result,
      });
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }
  /**
   * @async
   * @method getLawyerChatProfile
   * @param {Request} req The request object with `lawyerId` as params
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response containing lawyer chat profile details or error message
   */
  async getLawyerChatProfile(req: Request, res: Response): Promise<void> {
    try {
      const result = await this._getLawyerChatProfileUseCase.execute(
        new mongoose.Types.ObjectId(req.params.lawyerId),
      );
      res.status(AppStatusCode.SUCCESS_CODE).json({
        success: true,
        message: "Lawyer chat profile found successfully",
        data: result,
      });
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }
  /**
   * @async
   * @method addReview
   * @param {Request} req The request object `lawyerId` and review details as body
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response containing the success message or error message
   */
  async addReview(req: Request, res: Response): Promise<void> {
    try {
      await this._addReviewUseCase.execute(
        new mongoose.Types.ObjectId(req.params.lawyerId),
        req.body,
      );
      res
        .status(AppStatusCode.SUCCESS_CODE)
        .json({ success: true, message: "Review added successfully" });
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }
  /**
   * @async
   * @method getReview
   * @param {Request} req The request object with `lawyerId` as params
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response containing review details or error message
   */
  async getReview(req: Request, res: Response): Promise<void> {
    try {
      const result = await this._getReviewUseCase.execute(
        new mongoose.Types.ObjectId(req.params.lawyerId),
      );
      res.status(AppStatusCode.SUCCESS_CODE).json({
        success: true,
        message: "Review found successfully",
        data: result,
      });
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }
}
