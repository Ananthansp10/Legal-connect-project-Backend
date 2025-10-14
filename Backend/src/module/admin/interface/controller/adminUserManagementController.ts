import { AppError } from "../../../../common/error/AppEnumError";
import { AppStatusCode } from "../../../../common/statusCode/AppStatusCode";
import { IGetUsersUseCase } from "../../application/use-case-interface/IGetUsersUseCase";
import { Request, Response } from "express";
import { IUserResponse } from "../../domain/dtos/userDto";
import { IVerifyUserStatusUseCase } from "../../application/use-case-interface/IVerifyUserStatusUseCase";
import { ISearchUserUseCase } from "../../application/use-case-interface/ISearchUserUseCase";
import { IFilterUserUseCase } from "../../application/use-case-interface/IFilterUserUseCase";
import { IGetUserProfileDataUseCase } from "../../application/use-case-interface/IGetUserProfileDataUseCase";
import mongoose from "mongoose";

export class AdminUserManagementController {
  constructor(
    private _getUserApplication: IGetUsersUseCase,
    private _verifyUserStatusApplication: IVerifyUserStatusUseCase,
    private _searchUserUseCase: ISearchUserUseCase,
    private _filterUserUseCase: IFilterUserUseCase,
    private _getUserProfileDataUseCase: IGetUserProfileDataUseCase,
  ) {}

  async getUsers(req: Request, res: Response) {
    try {
      const result: { data: IUserResponse[]; totalData: number } | null =
        await this._getUserApplication.execute(
          parseInt(req.params.startIndex),
          parseInt(req.params.limit),
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

  async verifyUserStatus(req: Request, res: Response) {
    try {
      const result: boolean = await this._verifyUserStatusApplication.execute(
        req.params.userId,
        req.params.status,
      );
      if (result) {
        res
          .status(AppStatusCode.SUCCESS_CODE)
          .json({ success: true, message: "User blocked successfully" });
      } else {
        res
          .status(AppStatusCode.SUCCESS_CODE)
          .json({ success: true, message: "User unblocked successfully" });
      }
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }

  async searchUser(req: Request, res: Response) {
    try {
      const result = await this._searchUserUseCase.execute(req.params.name);
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

  async filterUser(req: Request, res: Response) {
    try {
      const result = await this._filterUserUseCase.execute(req.params.status);
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

  async getUserProfile(req: Request, res: Response) {
    try {
      const result = await this._getUserProfileDataUseCase.execute(
        new mongoose.Types.ObjectId(req.params.userId),
      );
      res.status(AppStatusCode.SUCCESS_CODE).json({
        success: true,
        message: "User profile found successfully",
        data: result,
      });
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }
}
