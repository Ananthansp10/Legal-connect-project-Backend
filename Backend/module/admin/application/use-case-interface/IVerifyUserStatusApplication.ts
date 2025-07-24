

export interface IVerifyUserStatusApplication{
    execute(userId:string,status:string):Promise<boolean>;
}