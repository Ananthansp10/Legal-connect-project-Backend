import { IUserSignup } from "../../domain/userRegisterEntity";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema<IUserSignup>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    googleId: {
      type: String,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    isBlock: {
      type: Boolean,
    },
  },
  { timestamps: true },
);

export const userModel = mongoose.model<IUserSignup>("users", userSchema);
