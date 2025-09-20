import { Reviews } from "../entity/feedbackEntity";


export interface ReviewResponseDto {
    reviewsCount: number;
    rating: number;
    reviews: Reviews[];
}