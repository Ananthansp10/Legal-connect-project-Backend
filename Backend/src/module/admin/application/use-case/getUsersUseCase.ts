import { IUserResponse } from "../../domain/dtos/userDto";
import { IUserSignup } from "../../domain/entity/userEntity";
import { IUserRepository } from "../../infrastructure/repositoryInterface/IuserRepository";
import { UserMapper } from "../mapper/userMapper";
import { IGetUsersUseCase } from "../use-case-interface/IGetUsersUseCase";

export class GetUsersUseCase implements IGetUsersUseCase {
  constructor(private _userRepo: IUserRepository) {}

  async execute(
    startIndex: number,
    limit: number,
  ): Promise<{ data: IUserResponse[]; totalData: number }> {
    try {
      const user: { data: IUserSignup[]; totalData: number } | null =
        await this._userRepo.findAll(startIndex, limit);
      let response: IUserResponse[] = [];
      if (user) {
        response = await UserMapper.toResponse(user.data);
      }
      return { data: response, totalData: user?.totalData || 0 };
    } catch (error) {
      throw error;
    }
  }
}
