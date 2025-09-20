import { Types } from "mongoose";


export interface IResheduleAppointmentUseCase {
    execute(appointmentId: Types.ObjectId): Promise<void>;
}