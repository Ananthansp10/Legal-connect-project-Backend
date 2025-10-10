import { Types } from "mongoose";
import { IAppointmentRepository } from "../../infrastructure/repositoryInterface/IAppointmentRepository";
import { IUpdateAppointmentStatus } from "../use-case-interface/IUpdateAppointmentStatusUseCase";
import { IPlanRepository } from "../../infrastructure/repositoryInterface/IPlanRepository";
import { AppException } from "../../../../common/error/errorException";
import { IBankDetailsRepository } from "../../infrastructure/repositoryInterface/IBankDetailsRepository";
import { AppointmentStatus } from "../../../../common/status/appointmentStatus";

export class UpdateAppointmentStatusUseCase
  implements IUpdateAppointmentStatus
{
  constructor(
    private _appointmentRepo: IAppointmentRepository,
    private _planRepo: IPlanRepository,
    private _bankRepo: IBankDetailsRepository,
  ) {}

  async execute(
    appointmentId: Types.ObjectId,
    appointmentStatus: string,
    lawyerId: Types.ObjectId,
  ): Promise<void> {
    if (appointmentStatus == AppointmentStatus.ACCEPTED) {
      const subscribed = await this._planRepo.findPlan(lawyerId);
      if (!subscribed) {
        throw new AppException(
          "Cant accept ! please subscribe to continue",
          403,
        );
      } else {
        const isBankDetailsExist =
          await this._bankRepo.findBankDetails(lawyerId);
        if (!isBankDetailsExist) {
          throw new AppException(
            "First add your bank details for accepting the appointment",
            403,
          );
        }
        const checkActivePlan = subscribed.plans.filter(
          (plan) => plan.isActive,
        );
        if (checkActivePlan.length == 0) {
          throw new AppException(
            "Cant accept ! your plan has been expired ! please subscribe to continue",
            403,
          );
        }
        await this._appointmentRepo.updateStatus(
          appointmentId,
          appointmentStatus,
        );
        await this._planRepo.updatePlanAppointment(
          lawyerId,
          checkActivePlan[0].planId,
        );
      }
    } else {
      await this._appointmentRepo.updateStatus(
        appointmentId,
        appointmentStatus,
      );
    }
  }
}
