import { IUserResponse } from "../../domain/dtos/userDto";
import { IUserSignup } from "../../domain/entity/userEntity";
import { IUserRepository } from "../../infrastructure/repositoryInterface/IuserRepository";
import { UserMapper } from "../mapper/userMapper";
import { IGetUsersUseCase } from "../use-case-interface/IGetUsersUseCase";

export class GetUsersUseCase implements IGetUsersUseCase {

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