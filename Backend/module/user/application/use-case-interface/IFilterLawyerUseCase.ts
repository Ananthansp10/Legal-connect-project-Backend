import { getLawyerResponse } from "../mapper/getLawyerMapper";

export interface IFilterLawyerUseCase {
  execute(specialization: string): Promise<getLawyerResponse[] | null>;
}
