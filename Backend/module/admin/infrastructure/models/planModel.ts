import mongoose from "mongoose";
import { IPlansEntity } from "../../domain/entity/plansEntity";

const plansSchema = new mongoose.Schema<IPlansEntity>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  planType: {
    type: String,
    required: true,
  },
  features: [
    {
      type: String,
      required: true,
    },
  ],
  status: {
    type: Boolean,
    required: true,
  },
  isDeleted: {
    type: Boolean,
  },
});

export const planModel = mongoose.model<IPlansEntity>("plans", plansSchema);
