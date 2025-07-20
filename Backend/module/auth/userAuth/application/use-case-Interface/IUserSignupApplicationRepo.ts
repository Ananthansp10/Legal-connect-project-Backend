import { UserSignupResponseDto } from "../../domain/dto/userSignupDto";
import { IUserSignup } from "../../domain/userRegisterEntity";


export interface IUserSignupApplication{
    registerUser(data:IUserSignup):Promise<UserSignupResponseDto | null>
}