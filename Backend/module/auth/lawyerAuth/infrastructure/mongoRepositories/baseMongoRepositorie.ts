import { IBaseRepositorie } from "../../interface/repositories/IbaseRepositorie";
import { Model } from "mongoose";

export class BaseMongoRepositorie<T> implements IBaseRepositorie<T>{

    private _model:Model<T>

    constructor(model:Model<T>){
        this._model=model
    }

    async findById(id: string): Promise<T | null> {
        return await this._model.findById(id)
    }

    async findByEmail(email: string): Promise<T | null> {
        return await this._model.findOne({email:email})
    }

    async create(data: T): Promise<T | null> {
       return await this._model.create(data)
    }

    async deleteByEmail(email: string): Promise<void> {
        await this._model.deleteOne({email:email})
    }
}