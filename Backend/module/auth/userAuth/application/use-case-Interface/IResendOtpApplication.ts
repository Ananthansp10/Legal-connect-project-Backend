

export interface IResendOtpApplication{
    resendOtp(email:string):Promise<void>
}