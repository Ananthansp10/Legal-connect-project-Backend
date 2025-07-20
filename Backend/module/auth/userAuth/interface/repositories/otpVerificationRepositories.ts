import { IOtpEntity } from "../../domain/otpEntity";


export interface IOtpVerificationRepo{

    findOtpByEmail(email:string):Promise<IOtpEntity | null>;
}