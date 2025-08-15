import { UserSigninDto } from "../../domain/dto/userSigninDto";
import { GoogleAuthEntity } from "../../domain/googleAuthEntity";


export interface IGoogleAuthUseCase{
    execute(data:GoogleAuthEntity):Promise<UserSigninDto>;
}