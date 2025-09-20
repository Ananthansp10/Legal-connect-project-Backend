import { IUserResponse } from "../../domain/dtos/userDto";
import { IUserSignup } from "../../domain/entity/userEntity";



export class UserMapper {

    static async toResponse(data: IUserSignup[]): Promise<IUserResponse[]> {
        return data.map((user) => ({
            _id: user._id!,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            status: user.isBlock,
            createdAt: user.createdAt
        }))
    }
}