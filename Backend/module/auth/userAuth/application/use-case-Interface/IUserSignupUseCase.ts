import {
  UserSignupRequestDto,
  UserSignupResponseDto,
} from "../../domain/dto/userSignupDto";

export interface IUserSignupUseCase {
  registerUser(
    data: UserSignupRequestDto,
  ): Promise<UserSignupResponseDto | null>;
}
