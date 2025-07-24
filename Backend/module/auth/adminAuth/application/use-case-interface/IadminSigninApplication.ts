import { IAdmin } from "../../domain/entity/adminEntity";


export interface IAdminSigninApplication{
    execute(data:IAdmin):Promise<{accessToken:string,refreshToken:string}>;
}