import { Types } from "mongoose";
import { ISlotAvailablityEntity } from "../../../lawyer/domain/entity/slotAvailablityEntity";
import { IGetLawyerSlotRepository } from "../repositoryInterface/IgetLawyerSlotRepository";
import { availableSlotModel } from "../../../lawyer/infrastructure/models/slotAvailablityModel";
import { IAppointmentEntity } from "../../domain/entity/appointmentEntity";
import { appointmentModel } from "../models/appointmentModel";
import { AppointmentStatus } from "../../../../common/status/appointmentStatus";



export class GetLawyerSlotRepository implements IGetLawyerSlotRepository {

    async findSlot(lawyerId: Types.ObjectId, date: string): Promise<ISlotAvailablityEntity[]> {
        return await availableSlotModel.find({ lawyerId: lawyerId, status: true, startDate: { $lte: date }, endDate: { $gte: date } })
    }

    async findAppointmentSlot(lawyerId: Types.ObjectId, date: string, time: string): Promise<IAppointmentEntity | null> {
        return await appointmentModel.findOne({ lawyerId: lawyerId, date: date, time: time, appointmentStatus: { $nin: [AppointmentStatus.CANCELLED, AppointmentStatus.REJECTED] } })
    }
}