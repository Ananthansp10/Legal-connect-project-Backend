import { ISendOtpMailService } from "./IsendOtpMailService";
import { transporter } from "../../../../../config/nodemailerConfig";

export class sendOtpMailService implements ISendOtpMailService {

    async sendOtpMail(to: string, otp: string): Promise<void> {
        const mailOptions = {
            from: `"LegalConnect" <${process.env.EMAIL}>`,
            to,
            subject: 'Your OTP Code',
            html: `
        <div style="font-family:sans-serif;">
            <h2>Welcome to LegalConnect</h2>
            <p>Your OTP code is:</p>
            <h1 style="color:#3b82f6;">${otp}</h1>
            <p>This OTP will expire in 1 minutes.</p>
        </div>
        `,
        }

        await transporter.sendMail(mailOptions)
    }
}