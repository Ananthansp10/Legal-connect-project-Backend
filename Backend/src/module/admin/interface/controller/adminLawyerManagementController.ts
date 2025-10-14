import { Request, Response } from "express";
import { ILawyerVerificationUseCase } from "../../application/use-case-interface/ILawyerVerificationUseCase";
import { AppStatusCode } from "../../../../common/statusCode/AppStatusCode";
import { AppError } from "../../../../common/error/AppEnumError";
import { IGetUnverifiedLawyersUseCase } from "../../application/use-case-interface/IGetUnverifiedLawyerUseCase";
import { ILawyerResponse } from "../../domain/dtos/lawyerDto";
import { IGetLawyersUseCase } from "../../application/use-case-interface/IGetLawyerUseCase";
import { ILawyerVerificationStatusUseCase } from "../../application/use-case-interface/IVerifyLawyerStatusUseCase";
import { ISearchLawyerUseCase } from "../../application/use-case-interface/ISearchLawyerUseCase";
import { IFilterLawyerUseCase } from "../../application/use-case-interface/IFilterLawyerUseCase";
import { IGetLawyerProfileDataUseCase } from "../../application/use-case-interface/IGetLawyerProfileUseCase";
import mongoose from "mongoose";

export class AdminLawyerManagementController {
  constructor(
    private _verifyLawyerApplication: ILawyerVerificationUseCase,
    private _getUnverifiedLawyerApplication: IGetUnverifiedLawyersUseCase,
    private _getLawyersApplication: IGetLawyersUseCase,
    private _verifyLawyerStatusApplication: ILawyerVerificationStatusUseCase,
    private _searchLawyerUseCase: ISearchLawyerUseCase,
    private _filterLawyerUseCase: IFilterLawyerUseCase,
    private _getLawyerProfileDataUseCase: IGetLawyerProfileDataUseCase,
  ) {}

  async getUnverifiedLawyers(req: Request, res: Response) {
    try {
      const result: ILawyerResponse[] | null =
        await this._getUnverifiedLawyerApplication.execute();
      res.status(AppStatusCode.SUCCESS_CODE).json({
        success: true,
        message: "Data found successfully",
        data: result,
      });
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }

  async verifyLawyer(req: Request, res: Response) {
    try {
      const result: boolean = await this._verifyLawyerApplication.execute(
        req.params.lawyerId,
        req.params.status,
        req.params.reason,
      );
      if (result) {
        res
          .status(AppStatusCode.SUCCESS_CODE)
          .json({ success: true, message: "Lawyer Approved successfully" });
      } else {
        res
          .status(AppStatusCode.SUCCESS_CODE)
          .json({ success: true, message: "Lawyer rejected successfully" });
      }
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }

  async getLawyers(req: Request, res: Response) {
    try {
      const result: { data: ILawyerResponse[]; totalData: number } | null =
        await this._getLawyersApplication.execute(
          parseInt(req.query.page as string),
          parseInt(req.query.limit as string),
        );
      res.status(AppStatusCode.SUCCESS_CODE).json({
        success: true,
        message: "Data found successfully",
        data: result.data,
        totalData: result.totalData,
      });
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }

  async verifyLawyerStatus(req: Request, res: Response) {
    try {
      const result: boolean = await this._verifyLawyerStatusApplication.execute(
        req.params.lawyerId,
        req.params.status,
      );
      if (result) {
        res
          .status(AppStatusCode.SUCCESS_CODE)
          .json({ success: true, message: "Lawyer blocked successfully" });
      } else {
        res
          .status(AppStatusCode.SUCCESS_CODE)
          .json({ success: true, message: "Lawyer unblock successfully" });
      }
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }

  async searchLawyer(req: Request, res: Response) {
    try {
      const result = await this._searchLawyerUseCase.execute(req.params.name);
      res.status(AppStatusCode.SUCCESS_CODE).json({
        success: true,
        message: "Search data found successfully",
        data: result,
      });
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }

  async filterLawyer(req: Request, res: Response) {
    try {
      const result = await this._filterLawyerUseCase.execute(req.params.status);
      res.status(AppStatusCode.SUCCESS_CODE).json({
        success: true,
        message: "Filtered data found successfully",
        data: result,
      });
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }

  async getLawyerProfile(req: Request, res: Response) {
    try {
      const result = await this._getLawyerProfileDataUseCase.execute(
        new mongoose.Types.ObjectId(req.params.lawyerId),
      );
      res.status(AppStatusCode.SUCCESS_CODE).json({
        success: true,
        message: "Lawyer profile found successfully",
        data: result,
      });
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }
}
