

export interface IOtpVerificationApplication{
    verifyOtp(email:string,otp:string):Promise<boolean>;
}