import { AppStatus } from "../../../../common/status/appStatus";
import { ILawyerRepository } from "../../interface/repositories/ILawyerRepository";
import { ILawyerVerificationStatusApplication } from "../use-case-interface/IVerifyLawyerStatusApplication";



export class VerifyLawyerStatusApplication implements ILawyerVerificationStatusApplication{

    constructor(
        private _lawyerRepo:ILawyerRepository
    ){}

    async execute(lawyerId: string, status: string): Promise<boolean> {
        try {
            await this._lawyerRepo.updateLawyerStatus(lawyerId,status)
            if(status==AppStatus.UNBLOCK){
                return false;
            }else{
                return true;
            }
        } catch (error) {
            throw error
        }
    }
}