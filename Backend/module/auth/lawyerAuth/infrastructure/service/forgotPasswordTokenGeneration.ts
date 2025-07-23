import { IForgotPasswordTokenGeneration } from "./IforgotPasswordTokenGeneration";
import jwt from 'jsonwebtoken'

export class ForgotPasswordTokenGeneration implements IForgotPasswordTokenGeneration{

    async generateForgotPasswordToken(payload:object): Promise<string> {
        let token=jwt.sign(payload,process.env.FORGOT_PASSWORD_TOKEN_SECRET!)
        return token
    }
}