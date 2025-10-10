import mongoose, { Schema } from "mongoose";
import { ISubscribersEntity } from "../../domain/entity/subscribersEntity";

const subscribersSchema = new mongoose.Schema<ISubscribersEntity>({
  lawyerId: {
    type: Schema.Types.ObjectId,
    ref: "lawyer",
    required: true,
  },
  plans: [
    {
      planId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      activationDate: {
        type: String,
        required: true,
      },
      expireDate: {
        type: String,
        required: true,
      },
      isActive: {
        type: Boolean,
        required: true,
      },
      totalAppointments: {
        type: Number,
        required: true,
      },
      appointmentsCount: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  ],
});

export const subscribersModel = mongoose.model<ISubscribersEntity>(
  "subscribers",
  subscribersSchema,
);
