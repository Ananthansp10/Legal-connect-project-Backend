import { AppStatus } from "../../../../common/status/appStatus";
import { LawyerModel } from "../../../auth/lawyerAuth/infrastructure/models/lawyerModel";
import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import { ILawyerRepositorie } from "../../interface/repositories/ILawyerRepositorie";
import { BaseMongoRepositorie } from "./baseRepositories";



export class LawyerMongoRepositorie extends BaseMongoRepositorie<ILawyerSignup> implements ILawyerRepositorie{

    constructor(){
        super(LawyerModel)
    }

    async updateLawyerStatus(lawyerId: string, status: string): Promise<void> {
        if(status==AppStatus.UNBLOCK){
            await LawyerModel.findByIdAndUpdate(lawyerId,{$set:{isBlock:false}})
        }else{
            await LawyerModel.findByIdAndUpdate(lawyerId,{$set:{isBlock:true}})
        }
    }
}