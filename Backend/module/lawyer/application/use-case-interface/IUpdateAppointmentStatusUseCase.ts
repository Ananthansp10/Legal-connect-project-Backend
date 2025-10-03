import { Types } from "mongoose";

export interface IUpdateAppointmentStatus {
  execute(
    appointmentId: Types.ObjectId,
    appointmentStatus: string,
    lawyerId: Types.ObjectId,
  ): Promise<void>;
}
