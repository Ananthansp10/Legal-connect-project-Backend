import { Types } from "mongoose";


export interface ICancelAppointmentUseCase {
    execute(appointmentId: Types.ObjectId): Promise<void>;
}