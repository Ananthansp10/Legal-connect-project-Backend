import { IPlansEntity } from "../../domain/entity/plansEntity";


export interface IAddPlanUseCase{
    execute(data:IPlansEntity):Promise<void>;
}