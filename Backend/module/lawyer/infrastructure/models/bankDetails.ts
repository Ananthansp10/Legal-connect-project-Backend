import mongoose, { Schema } from "mongoose";

const bankDetailsSchema = new mongoose.Schema({
  lawyerId: {
    type: Schema.Types.ObjectId,
    ref: "lawyer",
    required: true,
  },
  contactId: {
    type: String,
    required: true,
  },
  fundAccountId: {
    type: String,
    required: true,
  },
});

export const bankDetailsModel = mongoose.model(
  "bankDetails",
  bankDetailsSchema
);
