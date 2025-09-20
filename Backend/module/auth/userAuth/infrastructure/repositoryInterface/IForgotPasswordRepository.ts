

export interface IForgotPasswordRepository {

    updatePasswordByEmail(email: string, password: string): Promise<void>;
}