import mongoose, { Schema } from "mongoose";
import { ILawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";

const lawyerProfileSchema = new Schema<ILawyerProfileEntity>({
  lawyerId: {
    type: Schema.Types.ObjectId,
    ref: "lawyers",
    required: true,
  },
  personalInfo: {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    DOB: {
      type: String,
    },
    gender: {
      type: String,
    },
    address: {
      street: {
        type: String,
      },
      country: {
        type: String,
      },
      state: {
        type: String,
      },
      city: {
        type: String,
      },
    },
    language: [String],
    profileImage: {
      type: String,
    },
  },
  proffessionalInfo: {
    practiceAreas: [String],
    barRegisterNumber: String,
    experience: String,
    courtName: String,
    workLocation: String,
    fee: String,
    availableDays: [String],
    startTime: String,
    endTime: String,
    education: [
      {
        degree: {
          type: String,
        },
        university: {
          type: String,
        },
        year: {
          type: String,
        },
      },
    ],
    documents: [String],
  },
});

export const lawyerProfileModel = mongoose.model<ILawyerProfileEntity>(
  "lawyerProfile",
  lawyerProfileSchema,
);
