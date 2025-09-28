import { Types } from "mongoose";


export interface IAddNotesUseCase {
    execute(appointmentId: Types.ObjectId, note: string): Promise<void>;
}