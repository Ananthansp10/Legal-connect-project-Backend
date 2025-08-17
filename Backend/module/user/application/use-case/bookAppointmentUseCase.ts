import { IAppointmentEntity } from "../../domain/entity/appointmentEntity";
import { IBookAppointmentRepository } from "../../infrastructure/repositoryInterface/IbookAppointmentRepository";
import { IBookAppointmentUseCase } from "../use-case-interface/IBookAppointmentUseCase";


export class BookAppointmentUseCase implements IBookAppointmentUseCase{

    constructor(
        private _bookAppointmentRepo:IBookAppointmentRepository
    ){}

    async execute(data: IAppointmentEntity): Promise<void> {
        await this._bookAppointmentRepo.create({...data,appointmentStatus:'pending'})
    }
}