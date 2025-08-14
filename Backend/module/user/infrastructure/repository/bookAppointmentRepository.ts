import { IAppointmentEntity } from "../../domain/entity/appointmentModel";
import { IBookAppointmentRepository } from "../repositoryInterface/IbookAppointmentRepository";
import { appointmentModel } from "../models/appointmentModel";
import { BaseRepository } from "./baseRepository";



export class BookAppointmentRepository extends BaseRepository<IAppointmentEntity> implements IBookAppointmentRepository{

    constructor(){
        super(appointmentModel)
    }
}