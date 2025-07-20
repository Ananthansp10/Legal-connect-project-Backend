import { generateOtp } from "../../../../../utils/generateOtp";
import { IGenerateOtpService } from "./IgenerateOtpService";


export class GenerateOtpService implements IGenerateOtpService{

    generateOtp():string {

        const otpGenerate=new generateOtp()
        const otp=otpGenerate.generate()
        return otp;
    }
}