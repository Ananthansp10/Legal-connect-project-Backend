import mongoose, { Schema } from "mongoose";
import { IAppointmentEntity } from "../../domain/entity/appointmentEntity";

const appointmentSchema = new Schema<IAppointmentEntity>({
  lawyerId: {
    type: Schema.Types.ObjectId,
    ref: "lawyer",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  consultationMode: {
    type: String,
  },
  problem: {
    type: String,
  },
  fee: {
    type: Number,
  },
  appointmentStatus: {
    type: String,
  },
  payment: {
    type: String,
  },
  paymentId: {
    type: String,
  },
  refundStatus: {
    type: String,
  },
  paymentDate: {
    type: String,
  },
  meetStart: {
    type: Boolean,
  },
  notes: {
    type: String,
  },
  feedback: {
    type: String
  },
  rating: {
    type: Number
  },
  caseId:{
    type: Number
  }
});

export const appointmentModel = mongoose.model<IAppointmentEntity>(
  "appointments",
  appointmentSchema,
);
