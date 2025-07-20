import { UserSigninDto } from "../../domain/dto/userSigninDto";


export interface IUserSigninApplication{
    execute(email:string,password:string):Promise<UserSigninDto>;
}