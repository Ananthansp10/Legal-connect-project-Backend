import { UserSignupResponseDto } from "../../domain/dto/userSignupDto";
import { IUserSignup } from "../../domain/userRegisterEntity";


export interface IUserSignupUseCase{
    registerUser(data:IUserSignup):Promise<UserSignupResponseDto | null>
}