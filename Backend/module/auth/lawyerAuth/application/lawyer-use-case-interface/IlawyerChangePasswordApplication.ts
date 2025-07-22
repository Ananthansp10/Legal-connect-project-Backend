

export interface ILawyerChangePasswordApplication{
    changePassword(email:string,password:string,token:string):Promise<void>;
}