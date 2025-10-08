import { GoogleAuthRequestDto } from "../../domain/dto/googleAuthDto";
import { UserSigninDto } from "../../domain/dto/userSigninDto";

export interface IGoogleAuthUseCase {
  execute(data: GoogleAuthRequestDto): Promise<UserSigninDto>;
}
