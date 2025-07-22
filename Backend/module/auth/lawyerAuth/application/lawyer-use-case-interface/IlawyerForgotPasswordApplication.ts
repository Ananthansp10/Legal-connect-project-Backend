

export interface ILawyerForgotPasswordApplication{
    execute(email:string):Promise<void>;
}