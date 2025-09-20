import { AppException } from "../../../../common/error/errorException";
import { AppointmentStatus } from "../../../../common/status/appointmentStatus";
import { AppointmentRequestDto } from "../../domain/dtos/appointmentDto";
import { IBookAppointmentRepository } from "../../infrastructure/repositoryInterface/IbookAppointmentRepository";
import { IBookAppointmentUseCase } from "../use-case-interface/IBookAppointmentUseCase";


export class BookAppointmentUseCase implements IBookAppointmentUseCase {

    constructor(
        private _bookAppointmentRepo: IBookAppointmentRepository
    ) { }

    async execute(data: AppointmentRequestDto): Promise<void> {
        try {
            const appointmentExist = await this._bookAppointmentRepo.findAppointmentExist(data.lawyerId, data.date, data.time)
            if (appointmentExist) {
                throw new AppException("Appointment Already Taken", 403)
            }
            await this._bookAppointmentRepo.create({ ...data, appointmentStatus: AppointmentStatus.PENDING })
        } catch (error) {
            throw error
        }
    }
}