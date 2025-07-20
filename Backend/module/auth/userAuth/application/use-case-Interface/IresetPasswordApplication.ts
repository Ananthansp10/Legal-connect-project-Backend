

export interface IResetPasswordApplication{
    execute(email:string,oldPassword:string,newPassword:string):Promise<void>;
}