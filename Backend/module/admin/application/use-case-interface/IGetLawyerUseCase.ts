import { ILawyerResponse } from "../../domain/dtos/lawyerDto";

export interface IGetLawyersUseCase {
  execute(
    startIndex: number,
    limit: number,
  ): Promise<{ data: ILawyerResponse[]; totalData: number }>;
}
