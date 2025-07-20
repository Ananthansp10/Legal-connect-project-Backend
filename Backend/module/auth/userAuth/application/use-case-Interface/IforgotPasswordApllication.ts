

export interface IForgotPasswordApplication{
    execute(email:string):Promise<{email:string}>;
}