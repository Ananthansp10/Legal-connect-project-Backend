import { Types } from "mongoose";
import { ILawyerChatProfileDto } from "../../domain/dtos/lawyerChatProfileDto";

export interface IGetLawyerChatProfileUseCase {
  execute(lawyerId: Types.ObjectId): Promise<ILawyerChatProfileDto | null>;
}
