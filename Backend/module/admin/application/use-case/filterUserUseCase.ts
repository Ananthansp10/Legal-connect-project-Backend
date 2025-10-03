import { IUserResponse } from "../../domain/dtos/userDto";
import { IUserRepository } from "../../infrastructure/repositoryInterface/IuserRepository";
import { UserMapper } from "../mapper/userMapper";
import { IFilterUserUseCase } from "../use-case-interface/IFilterUserUseCase";

export class FilterUserUseCase implements IFilterUserUseCase {
  constructor(private _userRepo: IUserRepository) {}

  async execute(status: string): Promise<IUserResponse[] | null> {
    const users = await this._userRepo.filterUser(status);
    let response: IUserResponse[] = [];
    if (users) {
      response = await UserMapper.toResponse(users);
    }
    return response;
  }
}
