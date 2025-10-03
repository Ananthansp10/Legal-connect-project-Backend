import { AppError } from "../../../../common/error/AppEnumError";
import { AppStatusCode } from "../../../../common/statusCode/AppStatusCode";
import { IGetLawyerProfileUseCase } from "../../application/use-case-interface/IGetLawyerProfileUseCase";
import { ILawyerAddProfileUseCase } from "../../application/use-case-interface/ILawyerAddProfileUseCase";
import { Request, Response } from "express";
import { LawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";
import { IEditLawyerProfileUseCase } from "../../application/use-case-interface/IEditLawyerProfileUseCase";
import { IGetLawyerProfileImageUseCase } from "../../application/use-case-interface/IGetLawyerProfileImageUseCase";
import mongoose from "mongoose";

export class LawyerProfileController {
  constructor(
    private _lawyerAddProfileApplication: ILawyerAddProfileUseCase,
    private _lawyerGetProfileApplication: IGetLawyerProfileUseCase,
    private _lawyerEditProfileApplication: IEditLawyerProfileUseCase,
    private _getLawyerProfileImageUseCase: IGetLawyerProfileImageUseCase,
  ) {}

  async addLawyerProfile(req: Request, res: Response) {
    try {
      const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      const imageUrls = {
        profileImage:
          files.profileImage?.map((file) => ({ path: file.path })) || [],
        barCouncilCertificate: files.barCouncilCertificate?.map((file) => ({
          path: file.path,
        })),
        degreeCertificate: files.degreeCertificate?.map((file) => ({
          path: file.path,
        })),
        experienceCertificate: files.experienceCertificate?.map((file) => ({
          path: file.path,
        })),
        idProof: files.idProof?.map((file) => ({ path: file.path })),
      };
      await this._lawyerAddProfileApplication.execute(req.body, imageUrls);
      res
        .status(AppStatusCode.SUCCESS_CODE)
        .json({ success: true, message: "Profile added successfully" });
    } catch (error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }

  async getLawyerProfile(req: Request, res: Response) {
    try {
      const result: LawyerProfileEntity | null =
        await this._lawyerGetProfileApplication.execute(req.params.lawyerId);
      res
        .status(AppStatusCode.SUCCESS_CODE)
        .json({
          success: true,
          message: "Data found successfully",
          data: result,
        });
    } catch (error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ sucess: false, message: AppError.UNKNOWN_ERROR });
    }
  }

  async editLawyerProfile(req: Request, res: Response) {
    try {
      const imageUrl = req?.file?.path;
      await this._lawyerEditProfileApplication.execute(req.body, imageUrl!);
      res
        .status(AppStatusCode.SUCCESS_CODE)
        .json({ success: true, message: "Profile edited successfully" });
    } catch (error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }

  async getLawyerProfileImage(req: Request, res: Response) {
    try {
      const result = await this._getLawyerProfileImageUseCase.execute(
        new mongoose.Types.ObjectId(req.params.lawyerId),
      );
      res
        .status(AppStatusCode.SUCCESS_CODE)
        .json({
          success: true,
          message: "Profile image found successfully",
          data: result,
        });
    } catch (error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }
}
