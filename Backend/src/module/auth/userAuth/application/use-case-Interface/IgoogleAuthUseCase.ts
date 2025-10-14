import { IGoogleAuthRequestDto } from "../../domain/dto/googleAuthDto";
import { IUserSigninDto } from "../../domain/dto/userSigninDto";

export interface IGoogleAuthUseCase {
  execute(data: IGoogleAuthRequestDto): Promise<IUserSigninDto>;
}
