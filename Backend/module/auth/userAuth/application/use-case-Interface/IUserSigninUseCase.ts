import { UserSigninDto } from "../../domain/dto/userSigninDto";


export interface IUserSigninUseCase{
    execute(email:string,password:string):Promise<UserSigninDto>;
}