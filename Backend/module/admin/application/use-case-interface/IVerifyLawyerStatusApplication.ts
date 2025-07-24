

export interface ILawyerVerificationStatusApplication{
    execute(lawyerId:string,status:string):Promise<boolean>;
}