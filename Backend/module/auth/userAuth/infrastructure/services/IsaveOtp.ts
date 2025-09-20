

export interface IOtpService {
    saveOtp(email: string, otp: string): Promise<void>;
    deleteOtp(email: string): Promise<void>;
}