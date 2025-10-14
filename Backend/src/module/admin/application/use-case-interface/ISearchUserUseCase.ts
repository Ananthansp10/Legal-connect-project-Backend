import { IUserResponse } from "../../domain/dtos/userDto";

export interface ISearchUserUseCase {
  execute(name: string): Promise<IUserResponse[] | null>;
}
