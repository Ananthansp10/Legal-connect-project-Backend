import { IOtpService } from "./IsaveOtp";
import { otpModel } from "../models/otpModel";

export class OtpService implements IOtpService{

    async saveOtp(email: string, otp: string): Promise<void> {
        await otpModel.create({email:email,otp:otp})
    }

    async deleteOtp(email: string): Promise<void> {
        await otpModel.deleteOne({email:email})
    }
}