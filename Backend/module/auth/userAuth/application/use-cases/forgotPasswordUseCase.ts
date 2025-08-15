import { IGenerateOtpService } from "../../infrastructure/services/IgenerateOtpService";
import { IHashService } from "../../infrastructure/services/IhashService";
import { IOtpService } from "../../infrastructure/services/IsaveOtp";
import { ISendOtpMailService } from "../../infrastructure/services/IsendOtpMailService";
import { IForgotPasswordUseCase } from "../use-case-Interface/IforgotPasswordUseCase";


export class ForgotPasswordUseCase implements IForgotPasswordUseCase{

    constructor(

        private _otpRepo:IOtpService,
        private _otpGenerateService:IGenerateOtpService,
        private _hashService:IHashService,
        private _emailService:ISendOtpMailService
    ){}

    async execute(email: string): Promise<{email:string}> {
        
        let otp=this._otpGenerateService.generateOtp()

        let hashedOtp=await this._hashService.hash(otp)

        await this._otpRepo.saveOtp(email,hashedOtp)

        this._emailService.sendOtpMail(email,otp)

        setTimeout(() => {
            this._otpRepo.deleteOtp(email)
        }, 60000*2);

        return {email:email}
    }

}