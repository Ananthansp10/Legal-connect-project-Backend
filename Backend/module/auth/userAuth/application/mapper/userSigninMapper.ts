import { UserSigninDto } from "../../domain/dto/userSigninDto";
import { IUserSignup } from "../../domain/userRegisterEntity";


export class UserSigninMapper{

    static toResponse(data:IUserSignup,accessToken:string,refreshToken:string):UserSigninDto{
        return {
            userData:{
                id:data._id!,
                name:data.name,
                email:data.email,
                googleId:data?.googleId
            },
            accessToken:accessToken,
            refreshToken:refreshToken
        }
    }
}