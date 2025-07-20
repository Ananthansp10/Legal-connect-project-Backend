import { IOtpEntity } from "../../domain/otpEntity";
import { IOtpVerificationRepo } from "../../interface/repositories/otpVerificationRepositories";
import { otpModel } from "../models/otpModel";
import { UserModel } from "../models/userSignupModel";


export class OtpVerificationMongoRepo implements IOtpVerificationRepo{

    async findOtpByEmail(email: string): Promise<IOtpEntity | null> {
        return await otpModel.findOne({email:email})
    }
}