import { Schema } from "mongoose";
import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import mongoose from "mongoose";

const lawyerSignupSchema=new Schema<ILawyerSignup>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    specialization:[{
        type:String,
    }],
    experience:{
        type:String,
        required:true
    },
    barCouncilNumber:{
        type:String,
        required:true
    },
    documents:[
        {
            type:String
        }
    ],
    isBlock:{
        type:Boolean,
        default:false
    },
    verified:{
        type:Boolean,
        default:false
    },
    reason:{
        type:String
    }
},{timestamps:true})

export const LawyerModel=mongoose.model<ILawyerSignup>("lawyer",lawyerSignupSchema)