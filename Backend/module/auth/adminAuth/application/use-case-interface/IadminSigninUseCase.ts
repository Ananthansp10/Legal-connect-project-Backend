import { IAdmin } from "../../domain/entity/adminEntity";


export interface IAdminSigninUseCase{
    execute(data:IAdmin):Promise<{accessToken:string,refreshToken:string}>;
}