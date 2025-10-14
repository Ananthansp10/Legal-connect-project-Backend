export interface IForgotPasswordTokenGeneration {
  generateForgotPasswordToken(payload: object): Promise<string>;
}
