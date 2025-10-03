import { Types } from "mongoose";

export interface IStartMeetingUseCase {
  execute(appointmentId: Types.ObjectId): Promise<void>;
}
