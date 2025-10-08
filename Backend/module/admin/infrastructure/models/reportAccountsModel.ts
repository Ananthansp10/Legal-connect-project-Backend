import mongoose, { Schema } from "mongoose";
import { ref } from "process";
import { IReportAccountEntity } from "../../domain/entity/reportAccountEntity";

const reportAccountSchema = new Schema<IReportAccountEntity>({
  reportedId: {
    type: Schema.Types.ObjectId,
    ref: "lawyer",
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  reports: [
    {
      reason: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      reporterId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    required: true,
  },
});

export const reportAccountModel = mongoose.model<IReportAccountEntity>(
  "reportedAccount",
  reportAccountSchema,
);
