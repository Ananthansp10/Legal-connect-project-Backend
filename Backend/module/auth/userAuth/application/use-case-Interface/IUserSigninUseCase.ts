import { IUserSigninDto } from "../../domain/dto/userSigninDto";

export interface IUserSigninUseCase {
  execute(email: string, password: string): Promise<IUserSigninDto>;
}
