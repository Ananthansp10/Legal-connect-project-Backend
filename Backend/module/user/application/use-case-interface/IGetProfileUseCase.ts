import { UserProfileMapper } from "../mapper/userProfileMapper";

export interface IGetProfileUseCase {
  execute(userId: string): Promise<UserProfileMapper | null>;
}
