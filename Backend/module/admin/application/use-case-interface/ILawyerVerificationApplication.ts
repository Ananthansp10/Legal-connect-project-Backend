

export interface ILawyerVerificationApplication{
    execute(lawyerId:string,status:string,reason:string):Promise<boolean>;
}