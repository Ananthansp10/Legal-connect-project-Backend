import { AppError } from "../../../../common/error/AppEnumError";
import { AppStatusCode } from "../../../../common/statusCode/AppStatusCode";
import { IGetAppointmentsUseCase } from "../../application/use-case-interface/IGetAppointmentsUseCase";
import { Request, Response } from "express";
import { IGetReportedAccountsUseCase } from "../../application/use-case-interface/IGetReportedAccountsUseCase";
import { IUpdateReportedAccountStatusUseCase } from "../../application/use-case-interface/IUpdateReportAccountStatusUseCase";
import mongoose, { mongo } from "mongoose";
import { IAddPlanUseCase } from "../../application/use-case-interface/IAddPlanUseCase";
import { IEditPlanUseCase } from "../../application/use-case-interface/IEditPlanUseCase";
import { IManagePlanStatusUseCase } from "../../application/use-case-interface/IManagePlanStatusUseCase";
import { IDeletePlanUseCase } from "../../application/use-case-interface/IDeletePlanUseCase";
import { IGetPlansUseCase } from "../../application/use-case-interface/IGetPlansUseCase";
import { IPlansEntity } from "../../domain/entity/plansEntity";
import { AppException } from "../../../../common/error/errorException";
import { IGetSummaryReportUseCase } from "../../application/use-case-interface/IGetSummaryReportUseCase";
import { IGetReportsUseCase } from "../../application/use-case-interface/IGetReportsUseCase";

export class AdminController {

    constructor(
        private _getAppointmentsUseCase: IGetAppointmentsUseCase,
        private _getReportedAccountUseCase: IGetReportedAccountsUseCase,
        private _updateReportedAccountUseCase: IUpdateReportedAccountStatusUseCase,
        private _addPlanUseCase: IAddPlanUseCase,
        private _editPlanUseCase: IEditPlanUseCase,
        private _managePlanStatusUseCase: IManagePlanStatusUseCase,
        private _deletePlanUseCase: IDeletePlanUseCase,
        private _getPlanUseCase: IGetPlansUseCase,
        private _getSummaryReportUseCase: IGetSummaryReportUseCase,
        private _getReportsUseCase: IGetReportsUseCase
    ) { }

    async getAppointments(req: Request, res: Response) {
        try {
            let result = await this._getAppointmentsUseCase.execute(req.params.appointmentStatus)
            res.status(AppStatusCode.SUCCESS_CODE).json({ success: true, message: 'Appointments found successfully', data: result })
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({ success: false, message: AppError.UNKNOWN_ERROR })
        }
    }

    async getReportedAccounts(req: Request, res: Response) {
        try {
            let result = await this._getReportedAccountUseCase.execute(req.params.userType == 'All' ? req.params.userType : req.params.userType.toLowerCase().slice(0, req.params.userType.length - 1))
            res.status(AppStatusCode.SUCCESS_CODE).json({ success: true, message: "Reported Accounts found successfully", data: result })
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({ success: false, message: AppError.UNKNOWN_ERROR })
        }
    }

    async updateReportedAccountStatus(req: Request, res: Response) {
        try {
            await this._updateReportedAccountUseCase.execute(new mongoose.Types.ObjectId(req.params.reportedAccountId))
            res.status(AppStatusCode.SUCCESS_CODE).json({ success: true, message: "Updated Reported Account" })
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({ success: false, message: AppError.UNKNOWN_ERROR })
        }
    }

    async addPlan(req: Request, res: Response) {
        try {
            await this._addPlanUseCase.execute(req.body)
            res.status(AppStatusCode.SUCCESS_CODE).json({ success: true, message: "Plan added successfully" })
        } catch (error) {
            if (error instanceof AppException) {
                res.status(error.statusCode).json({ success: false, message: error.message })
            } else {
                res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({ success: false, message: AppError.UNKNOWN_ERROR })
            }
        }
    }

    async editPlan(req: Request, res: Response) {
        try {
            await this._editPlanUseCase.execute(new mongoose.Types.ObjectId(req.params.planId), req.body)
            res.status(AppStatusCode.SUCCESS_CODE).json({ success: true, message: "Plan updated successfully" })
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({ success: false, message: AppError.UNKNOWN_ERROR })
        }
    }

    async managePlanStatus(req: Request, res: Response) {
        try {
            await this._managePlanStatusUseCase.execute(new mongoose.Types.ObjectId(req.params.planId), req.params.status)
            res.status(AppStatusCode.SUCCESS_CODE).json({ success: true, message: req.params.status == 'Activate' ? 'Plan Activated' : 'Plan Deactivated' })
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({ success: false, message: AppError.UNKNOWN_ERROR })
        }
    }

    async DeletePlanUseCase(req: Request, res: Response) {
        try {
            await this._deletePlanUseCase.execute(new mongoose.Types.ObjectId(req.params.planId))
            res.status(AppStatusCode.SUCCESS_CODE).json({ success: true, message: "Plan deleted successfully" })
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({ success: false, message: AppError.UNKNOWN_ERROR })
        }
    }

    async getPlans(req: Request, res: Response) {
        try {
            let result = await this._getPlanUseCase.execute()
            res.status(AppStatusCode.SUCCESS_CODE).json({ success: true, messgae: "Plans found successfully", data: result })
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({ success: false, message: AppError.UNKNOWN_ERROR })
        }
    }

    async getSummaryReport(req: Request, res: Response) {
        try {
            let result = await this._getSummaryReportUseCase.execute()
            res.status(AppStatusCode.SUCCESS_CODE).json({ success: true, message: "Summary report found successfully", data: result })
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({ success: false, message: AppError.UNKNOWN_ERROR })
        }
    }

    async getReports(req: Request, res: Response) {
        try {
            let result = await this._getReportsUseCase.execute()
            res.status(AppStatusCode.SUCCESS_CODE).json({ success: true, message: "Reports found successfully", data: result })
        } catch (error) {
            res.status(AppStatusCode.INTERNAL_ERROR_CODE).json({ success: false, message: AppError.UNKNOWN_ERROR })
        }
    }
}