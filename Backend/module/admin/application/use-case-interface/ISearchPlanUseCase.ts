import { IPlansResponseDto } from "../../domain/dtos/plansDto";

export interface ISearchPlanUseCase {
  execute(planName: string): Promise<IPlansResponseDto[] | null>;
}
