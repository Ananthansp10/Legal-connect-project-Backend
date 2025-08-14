import { Types } from "mongoose";


export interface IDeleteSpecializationUseCase{
    execute(specId:string):Promise<void>;
}