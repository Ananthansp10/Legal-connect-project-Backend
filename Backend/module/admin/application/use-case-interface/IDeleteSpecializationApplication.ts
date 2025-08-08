import { Types } from "mongoose";


export interface IDeleteSpecializationApplication{
    execute(specId:string):Promise<void>;
}