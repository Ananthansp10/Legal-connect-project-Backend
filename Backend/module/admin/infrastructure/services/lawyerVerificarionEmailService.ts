import { ILawyerVerificationEmailService } from "./ILawyerVerificationEmailService";
import { transporter } from "../../../../config/nodemailerConfig";


export class LawyerVerificationEmail implements ILawyerVerificationEmailService {

    async sendVerificationEmail(to: string, name: string, status: string, reason: string): Promise<void> {
        let subject = ''
        let html = ''

        if (status === 'approve') {
            subject = 'Your Lawyer Profile Has Been Approved'
            html = `
            <h3>Hello ${name},</h3>
            <p>Congratulations! Your lawyer profile has been <strong>approved</strong>.</p>
            <p>You can now log in and start using your account.</p>
            <br/>
            <p>Regards,<br/>Legal Consultation Team</p>
            `
        } else {
            subject = 'Your Lawyer Profile Has Been Rejected'
            html = `
            <h3>Hello ${name},</h3>
            <p>We regret to inform you that your lawyer profile has been <strong>rejected</strong>.</p>
            ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
            <p>Your account has rejected for six month after six month re-register your account</p>
            <br/>
            <p>Regards,<br/>Legal Consultation Team</p>
            `
        }

        try {
            await transporter.sendMail({
                from: "Legal Platform",
                to: to,
                subject,
                html
            })
            console.log(`${status} email sent to ${to}`)
        } catch (err) {
            console.error("Failed to send email:", err)
        }
    }
}