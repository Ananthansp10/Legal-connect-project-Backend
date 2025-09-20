import { UserSignupRequestDto, UserSignupResponseDto } from "../../domain/dto/userSignupDto";
import { IUserSignup } from "../../domain/userRegisterEntity";


export interface IUserSignupUseCase {
    registerUser(data: UserSignupRequestDto): Promise<UserSignupResponseDto | null>
}