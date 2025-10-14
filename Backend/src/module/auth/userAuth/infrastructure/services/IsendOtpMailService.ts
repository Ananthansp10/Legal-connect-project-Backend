export interface ISendOtpMailService {
  sendOtpMail(to: string, otp: string): Promise<void>;
}
