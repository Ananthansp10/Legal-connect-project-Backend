import { IPlansEntity } from "../../../admin/domain/entity/plansEntity";


export interface IGetSubscriptionPlanUseCase{
    execute():Promise<IPlansEntity[] | null>;
}