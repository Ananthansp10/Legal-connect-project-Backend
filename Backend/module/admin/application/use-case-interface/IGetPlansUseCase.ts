import { IPlansEntity } from "../../domain/entity/plansEntity";


export interface IGetPlansUseCase{
    execute():Promise<IPlansEntity[] | null>;
}