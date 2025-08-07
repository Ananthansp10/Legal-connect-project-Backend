import mongoose, { Schema } from "mongoose";
import { UserProfileEntitie } from "../../domain/entity/userProfileUserEntity";

const userProfileSchema=new Schema<UserProfileEntitie>({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    name:{
        type:String
    },
    email:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    gender:{
        type:String
    },
    DOB:{
        type:String
    },
    proffession:{
        type:String
    },
    company:{
        type:String
    },
    profileImage:{
        type:String
    },
    address:{
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    zipCode: { type: String }
    }
})

export const userProfileModel=mongoose.model<UserProfileEntitie>("userProfile",userProfileSchema)