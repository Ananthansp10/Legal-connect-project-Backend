export interface IOtpVerificationUseCase {
  verifyOtp(email: string, otp: string): Promise<boolean>;
}
