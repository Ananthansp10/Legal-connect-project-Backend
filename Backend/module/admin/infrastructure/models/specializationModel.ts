import mongoose, { Schema } from "mongoose";
import { ISpecializationEntity } from "../../domain/entity/specializationEntity";

const specializationSchema = new Schema<ISpecializationEntity>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        required: true,
    },
});

export const specializationModel = mongoose.model<ISpecializationEntity>(
    "specialization",
    specializationSchema,
);
