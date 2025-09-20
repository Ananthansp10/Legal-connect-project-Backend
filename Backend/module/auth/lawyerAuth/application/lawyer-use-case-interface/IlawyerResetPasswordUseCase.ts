

export interface ILawyerResetPasswordUseCase {
    resetPassword(email: string, oldPassword: string, newPassword: string): Promise<void>;
}