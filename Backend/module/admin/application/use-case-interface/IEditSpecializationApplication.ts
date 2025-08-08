import { Types } from "mongoose";
import { SpecData } from "../../interface/repositories/IEditSpecializationRepository";


export interface IEditSpecializationApplication{
    execute(specId:Types.ObjectId,data:SpecData):Promise<void>;
}