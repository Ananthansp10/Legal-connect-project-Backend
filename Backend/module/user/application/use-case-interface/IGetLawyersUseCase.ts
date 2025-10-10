import { IGetLawyerResponse } from "../mapper/getLawyerMapper";

export interface IGetLawyerUseCase {
  execute(): Promise<IGetLawyerResponse[] | null>;
}
