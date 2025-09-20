import { adminSignInDto } from "../../domain/dtos/adminSigninDto";


export interface IAdminSigninUseCase {
    execute(data: adminSignInDto): Promise<{ accessToken: string, refreshToken: string }>;
}