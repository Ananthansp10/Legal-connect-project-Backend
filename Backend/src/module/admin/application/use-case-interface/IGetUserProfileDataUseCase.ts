import { Types } from "mongoose";
import { IUserProfileDataDto } from "../../domain/dtos/userProfileDto";

export interface IGetUserProfileDataUseCase {
  execute(lawyerId: Types.ObjectId): Promise<IUserProfileDataDto | null>;
}
