import { LawyerModel } from "../../../auth/lawyerAuth/infrastructure/models/lawyerModel";
import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import { ILawyerVerificationRepositorie } from "../../interface/repositories/lawyerVerificationRepositorie";
import { BaseMongoRepositorie } from "./baseRepositories";


export class LawyerVerificationMongoRepositorie extends BaseMongoRepositorie<ILawyerSignup> implements ILawyerVerificationRepositorie{

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