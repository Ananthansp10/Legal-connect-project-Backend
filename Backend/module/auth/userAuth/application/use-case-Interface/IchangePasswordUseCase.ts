

export interface IChangePasswordUseCase {
    changePassword(email: string, password: string): Promise<void>
}