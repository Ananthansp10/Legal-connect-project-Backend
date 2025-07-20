import { IGenerateOtpService } from "../../infrastructure/services/IgenerateOtpService";
import { IHashService } from "../../infrastructure/services/IhashService";
import { IOtpService } from "../../infrastructure/services/IsaveOtp";
import { ISendOtpMailService } from "../../infrastructure/services/IsendOtpMailService";
import { IResendOtpApplication } from "../use-case-Interface/IResendOtpApplication";


export class ResendOtpApplication implements IResendOtpApplication{

    constructor(private _otpService:IOtpService, private _generateOtpService:IGenerateOtpService, private _hashService:IHashService, private _sendEmailService:ISendOtpMailService){}

    async resendOtp(email: string): Promise<void> {

        let otp:string=this._generateOtpService.generateOtp()

        let hashedOtp=await this._hashService.hash(otp)

        await this._otpService.saveOtp(email,hashedOtp)

        this._sendEmailService.sendOtpMail(email,otp)

        setTimeout(() => {
            this._otpService.deleteOtp(email)
        }, 60000*2);

    }

}