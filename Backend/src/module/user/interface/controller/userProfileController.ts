import { AppError } from "../../../../common/error/AppEnumError";
import { AppStatusCode } from "../../../../common/statusCode/AppStatusCode";
import { IAddProfileUseCase } from "../../application/use-case-interface/IAddProfileUseCase";
import { Request, Response } from "express";
import { IGetProfileUseCase } from "../../application/use-case-interface/IGetProfileUseCase";
import { UserProfileMapper } from "../../application/mapper/userProfileMapper";
import { IEditProfileUseCase } from "../../application/use-case-interface/IEditProfileUseCase";

export class UserProfileController {
  constructor(
    private _userAddProfileApplication: IAddProfileUseCase,
    private _userGetProfile: IGetProfileUseCase,
    private _editUserProfile: IEditProfileUseCase,
  ) {}
  /**
   * @async
   * @method addProfile
   * @param {Request} req The request object that contain profile details as body
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response with success message or error message
   */
  async addProfile(req: Request, res: Response): Promise<void> {
    try {
      const imageUrl = req?.file?.path;
      await this._userAddProfileApplication.execute(req.body, imageUrl!);
      res
        .status(AppStatusCode.SUCCESS_CODE)
        .json({ success: true, message: "User profile added successfully" });
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }
  /**
   * @async
   * @method getUserProfile
   * @param {Request} req The request object with `userId` as params
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response with user profile details
   */
  async getUserProfile(req: Request, res: Response): Promise<void> {
    try {
      const result: UserProfileMapper | null =
        await this._userGetProfile.execute(req.params.userId);
      res.status(AppStatusCode.SUCCESS_CODE).json({
        success: true,
        message: "Profile found successfully",
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
   * @method editUserProfile
   * @param {Request} req The request object with user profile details as body
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response with success message or error message
   */
  async editUserProfile(req: Request, res: Response): Promise<void> {
    try {
      const imageUrl = req?.file?.path;
      const result: UserProfileMapper = await this._editUserProfile.execute(
        req.body.userId,
        req.body,
        imageUrl!,
      );
      res.status(AppStatusCode.SUCCESS_CODE).json({
        success: true,
        message: "Profile edited successfully",
        data: result,
      });
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }
}
