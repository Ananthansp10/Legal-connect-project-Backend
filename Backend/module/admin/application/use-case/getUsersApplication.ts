import { IUserResponse } from "../../domain/dtos/userDto";
import { IUserSignup } from "../../domain/entity/userEntity";
import { IUserRepository } from "../../interface/repositories/IuserRepository";
import { UserMapper } from "../mapper/userMapper";
import { IGetUsersApplication } from "../use-case-interface/IGetUsersApplication";

export class GetUsersApplication implements IGetUsersApplication {

    constructor(
        private _userRepo:IUserRepository
    ){}

    async execute(): Promise<IUserResponse[]> {
        try {
            let user:IUserSignup[] | null=await this._userRepo.findAll()
            let response:IUserResponse[]=[]
            if(user){
                response=await UserMapper.toResponse(user)
            }
            return response
        } catch (error) {
            throw error
        }
    }
}