import { UserProfile } from "../mapper/userProfileMapper";


export interface IAddProfileUseCase {
    execute(data: UserProfile, imageUrl: string): Promise<void>;
}