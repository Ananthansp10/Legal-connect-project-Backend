import mongoose, { Schema } from "mongoose";
import { IUserProfileEntitie } from "../../domain/entity/userProfileUserEntity";

const userProfileSchema = new Schema<IUserProfileEntitie>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  gender: {
    type: String,
  },
  DOB: {
    type: String,
  },
  proffession: {
    type: String,
  },
  company: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    zipCode: { type: String },
  },
});

export const userProfileModel = mongoose.model<IUserProfileEntitie>(
  "userProfile",
  userProfileSchema,
);
