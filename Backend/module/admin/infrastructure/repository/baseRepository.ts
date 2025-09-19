import { Model } from "mongoose";
import { IBaseRepository } from "../repositoryInterface/IBaseRepository";


export class BaseRepository<T> implements IBaseRepository<T>{

    private _model:Model<T>

    constructor(model:Model<T>){
        this._model=model
    }

    async findByEmail(email: string): Promise<T | null> {
        return await this._model.findOne({email:email})
    }

    async findById(id: string): Promise<T | null> {
        return await this._model.findById(id)
    }

    async findAll(startIndex:number,limit:number): Promise<{data:T[],totalData:number }| null> {
        let data=await this._model.find().skip(startIndex).limit(limit)
        let totalData=await this._model.countDocuments() || 0
        return {data,totalData}
    }

    async findAllUnverifiedLawyer(): Promise<T[] | null> {
        return await this._model.find({verified:false,reason:{$exists:false}}) 
    }
}