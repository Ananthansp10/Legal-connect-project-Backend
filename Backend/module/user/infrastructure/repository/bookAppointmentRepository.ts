import { IAppointmentEntity } from "../../domain/entity/appointmentEntity";
import { IBookAppointmentRepository } from "../repositoryInterface/IbookAppointmentRepository";
import { appointmentModel } from "../models/appointmentModel";
import { BaseRepository } from "./baseRepository";
import { Types } from "mongoose";



export class BookAppointmentRepository extends BaseRepository<IAppointmentEntity> implements IBookAppointmentRepository {

    constructor() {
        super(appointmentModel)
    }

    async findAppointmentExist(lawyerId: Types.ObjectId, date: string, time: string): Promise<boolean> {
        const result = await appointmentModel.findOne({ lawyerId: lawyerId, date: date, time: time })
        return result ? true : false
    }
}