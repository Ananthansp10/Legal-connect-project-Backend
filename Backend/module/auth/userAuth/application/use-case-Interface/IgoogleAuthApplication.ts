import { UserSigninDto } from "../../domain/dto/userSigninDto";
import { GoogleAuthEntity } from "../../domain/googleAuthEntity";


export interface IGoogleAuthApplication{
    execute(data:GoogleAuthEntity):Promise<UserSigninDto>;
}