

export interface IForgotPasswordRepo{
    
    updatePasswordByEmail(email:string,password:string):Promise<void>;
}