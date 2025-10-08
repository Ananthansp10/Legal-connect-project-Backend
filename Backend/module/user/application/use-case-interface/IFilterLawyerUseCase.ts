import { IGetLawyerResponse } from "../mapper/getLawyerMapper";

export interface IFilterLawyerUseCase {
  execute(specialization: string): Promise<IGetLawyerResponse[] | null>;
}
