import mongoose, { Schema } from "mongoose";
import { IOtpEntity } from "../../domain/otpEntity";

const otpSchema = new Schema<IOtpEntity>({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
});

export const otpModel = mongoose.model<IOtpEntity>("otp", otpSchema);
