export interface IResetPasswordUseCase {
  execute(
    email: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<void>;
}
