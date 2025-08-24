import { AppError } from "../../../../common/error/AppEnumError";
import { AppException } from "../../../../common/error/errorException";
import { AppStatusCode } from "../../../../common/statusCode/AppStatusCode";
import { IPlansEntity } from "../../domain/entity/plansEntity";
import { IPlanManagementRepository } from "../../infrastructure/repositoryInterface/IPlanManagementRepository";
import { IAddPlanUseCase } from "../use-case-interface/IAddPlanUseCase";


export class AddPlanUseCase implements IAddPlanUseCase{

    constructor(
        private _planManagementRepository:IPlanManagementRepository
    ){}

    async execute(data: IPlansEntity): Promise<void> {
        let isPlanExist=await this._planManagementRepository.isPlanExist(data.name)
        if(isPlanExist){
            throw new AppException("Plan Already exist",AppStatusCode.CONFLICT)
        }else{
            await this._planManagementRepository.addPlan({...data,status:true,isDeleted:false})
        }
    }
}