

export interface ILawyerVerificationUseCase{
    execute(lawyerId:string,status:string,reason:string):Promise<boolean>;
}