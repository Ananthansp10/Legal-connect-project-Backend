import { IOtpEntity } from "../../domain/otpEntity";


export interface IOtpVerificationRepository{

    findOtpByEmail(email:string):Promise<IOtpEntity | null>;
}