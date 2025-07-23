

export interface ILawyerVerificationEmailService{
    sendVerificationEmail(to:string,name:string,status:string,reason:string):Promise<void>;
}