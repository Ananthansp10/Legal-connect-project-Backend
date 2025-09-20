import { IUserResponse } from "../../domain/dtos/userDto";
import { IUserRepository } from "../../infrastructure/repositoryInterface/IuserRepository";
import { UserMapper } from "../mapper/userMapper";
import { ISearchUserUseCase } from "../use-case-interface/ISearchUserUseCase";


export class SearchUserUseCase implements ISearchUserUseCase {

    constructor(
        private _userRepo: IUserRepository
    ) { }

    async execute(name: string): Promise<IUserResponse[] | null> {
        const user = await this._userRepo.searchUser(name)
        let response: IUserResponse[] = []
        if (user) {
            response = await UserMapper.toResponse(user)
        }
        return response
    }
}