import { IPlansRequestDto } from "../../domain/dtos/plansDto";

export interface IAddPlanUseCase {
  execute(data: IPlansRequestDto): Promise<void>;
}
