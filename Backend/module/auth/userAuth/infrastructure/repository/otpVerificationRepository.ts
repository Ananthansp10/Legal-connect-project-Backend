import { IOtpEntity } from "../../domain/otpEntity";
import { IOtpVerificationRepository } from "../repositoryInterface/IOtpVerificationRepository";
import { otpModel } from "../models/otpModel";
import { UserModel } from "../models/userSignupModel";


export class OtpVerificationRepository implements IOtpVerificationRepository {

    async findOtpByEmail(email: string): Promise<IOtpEntity | null> {
        return await otpModel.findOne({ email: email })
    }
}