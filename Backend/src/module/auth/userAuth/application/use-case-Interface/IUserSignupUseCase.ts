import {
  IUserSignupRequestDto,
  IUserSignupResponseDto,
} from "../../domain/dto/userSignupDto";

export interface IUserSignupUseCase {
  registerUser(
    data: IUserSignupRequestDto,
  ): Promise<IUserSignupResponseDto | null>;
}
