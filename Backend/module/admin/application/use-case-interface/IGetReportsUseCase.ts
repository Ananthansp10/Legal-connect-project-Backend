import { IReportsDto } from "../../domain/dtos/reportsDto";

export interface IGetReportsUseCase {
  execute(
    revenueDateRange: string,
    specializationType: string,
  ): Promise<IReportsDto>;
}
