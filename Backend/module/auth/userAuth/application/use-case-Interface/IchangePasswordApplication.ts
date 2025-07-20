

export interface IChangePasswordApplication{
    changePassword(email:string,password:string):Promise<void>
}