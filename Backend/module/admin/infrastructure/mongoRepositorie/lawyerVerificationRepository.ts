import { LawyerModel } from "../../../auth/lawyerAuth/infrastructure/models/lawyerModel";
import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import { ILawyerVerificationRepository } from "../../interface/repositories/lawyerVerificationRepository";
import { BaseRepository } from "./baseRepository";


export class LawyerVerificationRepository extends BaseRepository<ILawyerSignup> implements ILawyerVerificationRepository{

    constructor(){
        super(LawyerModel)
    }

    async updateLawyerVerification(lawyerId: string, status: boolean, reason: string): Promise<void> {
        
        if(reason=="null"){
            await LawyerModel.findByIdAndUpdate(lawyerId,{$set:{verified:status}})
        }else{
            await LawyerModel.findByIdAndUpdate(lawyerId,{$set:{verified:status,reason:reason}})
        }

    }
}