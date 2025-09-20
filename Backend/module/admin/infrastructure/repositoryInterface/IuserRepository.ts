import { Types } from "mongoose";
import { IUserSignup } from "../../domain/entity/userEntity";
import { IBaseRepository } from "./IBaseRepository";
import { UserProfileEntitie } from "../../../user/domain/entity/userProfileUserEntity";


export interface IUserRepository extends IBaseRepository<IUserSignup> {
    updateUserStatus(userId: string, status: string): Promise<void>;
    searchUser(name: string): Promise<IUserSignup[] | null>;
    filterUser(status: string): Promise<IUserSignup[] | null>;
    getUserDetails(userId: Types.ObjectId): Promise<UserProfileEntitie | null>;
}