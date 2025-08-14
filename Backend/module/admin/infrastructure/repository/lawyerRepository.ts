import { AppStatus } from "../../../../common/status/appStatus";
import { LawyerModel } from "../../../auth/lawyerAuth/infrastructure/models/lawyerModel";
import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import { ILawyerRepository } from "../repositoryInterface/ILawyerRepository";
import { BaseRepository } from "./baseRepository";



export class LawyerRepository extends BaseRepository<ILawyerSignup> implements ILawyerRepository{

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