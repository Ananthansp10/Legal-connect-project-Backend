import { Model } from "mongoose";
import { IBaseRepositorie } from "../../interface/repositories/IBaseRepositorie";


export class BaseMongoRepositorie<T> implements IBaseRepositorie<T>{

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

    async findAll(): Promise<T[] | null> {
        return await this._model.find()
    }

    async findAllUnverifiedLawyer(): Promise<T[] | null> {
        return await this._model.find({verified:false,reason:{$exists:false}}) 
    }
}