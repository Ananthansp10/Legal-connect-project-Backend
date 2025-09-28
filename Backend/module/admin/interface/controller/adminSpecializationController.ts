import { AppError } from "../../../../common/error/AppEnumError";
import { AppStatusCode } from "../../../../common/statusCode/AppStatusCode";
import { IAddSpecializationUseCase } from "../../application/use-case-interface/IAddSpecialisationUseCase";
import { Request, Response } from "express";
import { IGetSpecializationUseCase } from "../../application/use-case-interface/IGetSpecializationUseCase";
import { IEditSpecializationUseCase } from "../../application/use-case-interface/IEditSpecializationUseCase";
import { IDeleteSpecializationUseCase } from "../../application/use-case-interface/IDeleteSpecializationUseCase";


export class AdminSpecializationController {

    constructor(
        private _addSpecializationApplication: IAddSpecializationUseCase,
        private _getSpecializationApplication: IGetSpecializationUseCase,
        private _editSpecializationApplication: IEditSpecializationUseCase,
        private _deleteSpecializationApplication: IDeleteSpecializationUseCase
    ) { }

    async addSpecialization(req: Request, res: Response): Promise<void> {
        try {
            await this._addSpecializationApplication.execute(req.body)
            res.status(AppStatusCode.SUCCESS_CODE).json({ success: true, message: "Specialization added successfully" })
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({ success: false, message: AppError.UNKNOWN_ERROR })
        }
    }

    async getSpecialization(req: Request, res: Response): Promise<void> {
        try {
            const result = await this._getSpecializationApplication.execute(parseInt(req.params.startIndex), parseInt(req.params.limit))
            res.status(AppStatusCode.SUCCESS_CODE).json({ success: true, message: "Specialization data found successfully", data: result?.specializations, totalSpecialization: result?.totalSpecializations })
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({ success: false, message: AppError.UNKNOWN_ERROR })
        }
    }

    async editSpecialization(req: Request, res: Response): Promise<void> {
        try {
            await this._editSpecializationApplication.execute(req.body.specId, { name: req.body.name, description: req.body.description, isDeleted: req.body.isDeleted })
            res.status(AppStatusCode.SUCCESS_CODE).json({ success: true, message: "Specialization edited successfully" })
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({ success: false, message: AppError.UNKNOWN_ERROR })
        }
    }

    async DeleteSpecializationApplication(req: Request, res: Response): Promise<void> {
        try {
            await this._deleteSpecializationApplication.execute(req.params.specId)
            res.status(AppStatusCode.SUCCESS_CODE).json({ success: true, message: "Specialization deleted successfully" })
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({ success: false, message: AppError.UNKNOWN_ERROR })
        }
    }
}