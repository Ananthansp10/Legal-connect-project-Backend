import { IAppointmentEntity } from "../../domain/entity/appointmentModel";
import { IBookAppointmentRepository } from "../../interface/repository/IbookAppointmentRepository";
import { IBookAppointmentApplication } from "../use-case-interface/IBookAppointmentApplication";


export class BookAppointmentApplication implements IBookAppointmentApplication{

    constructor(
        private _bookAppointmentRepo:IBookAppointmentRepository
    ){}

    async execute(data: IAppointmentEntity): Promise<void> {
        await this._bookAppointmentRepo.create(data)
    }
}