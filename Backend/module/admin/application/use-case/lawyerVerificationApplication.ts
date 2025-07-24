import { AppStatus } from "../../../../common/status/appStatus";
import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import { ILawyerVerificationEmailService } from "../../infrastructure/services/ILawyerVerificationEmailService";
import { ILawyerVerificationRepositorie } from "../../interface/repositories/lawyerVerificationRepositorie";
import { ILawyerVerificationApplication } from "../use-case-interface/ILawyerVerificationApplication";


export class LawyerVerificationApplication implements ILawyerVerificationApplication{

    constructor(
        private _lawyerVerificationRepo:ILawyerVerificationRepositorie,
        private _lawyerVerifyEmailService:ILawyerVerificationEmailService
    ){}

    async execute(lawyerId: string, status: string, reason: string): Promise<boolean> {

        let lawyer:ILawyerSignup | null=await this._lawyerVerificationRepo.findById(lawyerId)

        this._lawyerVerifyEmailService.sendVerificationEmail(lawyer?.email!,lawyer?.name!,status,reason)

        if(status==AppStatus.APPROVE){
            await this._lawyerVerificationRepo.updateLawyerVerification(lawyerId,true,reason)
            return true
        }else{
            await this._lawyerVerificationRepo.updateLawyerVerification(lawyerId,false,reason)
            return false
        }
    }
}