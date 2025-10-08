import { IGetLawyerResponse } from "../mapper/getLawyerMapper";

export interface ISearchLawyerUseCase {
  execute(name: string): Promise<IGetLawyerResponse[] | null>;
}
