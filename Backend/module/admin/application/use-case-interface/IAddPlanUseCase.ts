import { PlansRequestDto } from "../../domain/dtos/plansDto";

export interface IAddPlanUseCase {
  execute(data: PlansRequestDto): Promise<void>;
}
