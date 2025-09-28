import { Types } from "mongoose";
import { IAppointmentRepository } from "../../infrastructure/repositoryInterface/IAppointmentRepository";
import { IAddNotesUseCase } from "../use-case-interface/IAddNotesUseCase";


export class AddNotesUseCase implements IAddNotesUseCase {

    constructor(
        private _appointmentRepo: IAppointmentRepository
    ) { }

    async execute(appointmentId: Types.ObjectId, note: string): Promise<void> {
        await this._appointmentRepo.addNotes(appointmentId, note)
    }
}