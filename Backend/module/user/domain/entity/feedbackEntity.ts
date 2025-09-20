import { Types } from "mongoose";

export interface Reviews {
    userName: string;
    date: string;
    feedback: string;
    rating: number;
}

export interface FeedbackEntity {
    lawyerId: Types.ObjectId
    reviews: Reviews[]
}