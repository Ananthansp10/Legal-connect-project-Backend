

export interface IForgotPasswordEmailService{
    sendForgotPasswordEMail(toEmail:string,userName:string,token:string):Promise<void>;
}