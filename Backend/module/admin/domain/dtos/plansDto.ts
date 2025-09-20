import { Types } from "mongoose";


export interface PlansRequestDto {
    _id?: Types.ObjectId
    name: string;
    price: number;
    duration: number;
    planType: string;
    features: string[];
    status: boolean;
    isDeleted: boolean;
}

export interface PlansResponseDto {
    _id?: Types.ObjectId
    name: string;
    price: number;
    duration: number;
    planType: string;
    features: string[];
    status: boolean;
    isDeleted: boolean;
}