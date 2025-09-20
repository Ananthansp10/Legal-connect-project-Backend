

export interface ILawyerChangePasswordUseCase {
    changePassword(email: string, password: string, token: string): Promise<void>;
}