import { Types } from "mongoose";
import { UserProfileDataDto } from "../../domain/dtos/userProfileDto";


export interface IGetUserProfileDataUseCase {
    execute(lawyerId: Types.ObjectId): Promise<UserProfileDataDto | null>;
}