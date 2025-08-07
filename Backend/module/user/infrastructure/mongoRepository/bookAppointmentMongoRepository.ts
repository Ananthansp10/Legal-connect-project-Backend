import { IAppointmentEntity } from "../../domain/entity/appointmentModel";
import { IBookAppointmentRepository } from "../../interface/repository/IbookAppointmentRepository";
import { appointmentModel } from "../models/appointmentModel";
import { BaseRepository } from "../mongoRepository/baseMongoRepository";



export class BookAppointmentRepository extends BaseRepository<IAppointmentEntity> implements IBookAppointmentRepository{

    constructor(){
        super(appointmentModel)
    }
}