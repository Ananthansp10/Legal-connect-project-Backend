import { IUserProfile } from "../mapper/userProfileMapper";

export interface IAddProfileUseCase {
  execute(data: IUserProfile, imageUrl: string): Promise<void>;
}
