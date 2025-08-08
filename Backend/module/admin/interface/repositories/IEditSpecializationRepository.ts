import { Types } from "mongoose";

export interface SpecData{
    name:string;
    description:string;
    isDeleted:boolean;
}

export interface IEditSpecializationRepository{
    editSpecialization(specId:Types.ObjectId,data:SpecData):Promise<void>;
}