import { Types } from "mongoose";
import { IAppointmentResponseDto } from "./IGetAppointmentUseCase";

export interface ISearchAppointmentUseCase {
  execute(
    lawyerId: Types.ObjectId,
    userName: string,
  ): Promise<IAppointmentResponseDto[] | null>;
}
