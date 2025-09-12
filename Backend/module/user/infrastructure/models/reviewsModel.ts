import mongoose, { Schema } from "mongoose";
import { FeedbackEntity } from "../../domain/entity/feedbackEntity";

const reviewSchema=new mongoose.Schema<FeedbackEntity>({
    lawyerId:{
        type:Schema.Types.ObjectId,
        ref:'lawyer',
        required:true
    },
    reviews:[
        {
            userName:{
                type:String
            },
            date:{
                type:String
            },
            feedback:{
                type:String,
            },
            rating:{
                type:Number
            }
        }
    ]
})

export const reviewsModel=mongoose.model<FeedbackEntity>('reviews',reviewSchema)