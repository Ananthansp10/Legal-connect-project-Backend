import { ILawyerEditProfileRequest } from "../mapper/lawyerEditProfileMapper";

export interface IEditLawyerProfileUseCase {
  execute(data: ILawyerEditProfileRequest, imageUrl: string): Promise<void>;
}
