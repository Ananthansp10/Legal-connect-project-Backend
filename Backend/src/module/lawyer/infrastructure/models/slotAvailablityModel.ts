import mongoose, { Schema } from "mongoose";
import { ISlotAvailablityEntity } from "../../domain/entity/slotAvailablityEntity";

const slotAvailablitySchema = new Schema<ISlotAvailablityEntity>({
  lawyerId: {
    type: Schema.Types.ObjectId,
    ref: "lawyers",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  days: [
    {
      type: String,
    },
  ],
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  priority: {
    type: Number,
  },
  breakTimes: [
    {
      startTime: String,
      endTime: String,
    },
  ],
  bufferTime: {
    type: Number,
  },
  status: {
    type: Boolean,
  },
});

export const availableSlotModel = mongoose.model<ISlotAvailablityEntity>(
  "availableSlots",
  slotAvailablitySchema,
);
