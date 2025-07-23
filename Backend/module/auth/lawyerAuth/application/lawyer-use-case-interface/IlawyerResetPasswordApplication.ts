

export interface ILawyerResetPasswordApplication{
    resetPassword(email:string,oldPassword:string,newPassword:string):Promise<void>;
}