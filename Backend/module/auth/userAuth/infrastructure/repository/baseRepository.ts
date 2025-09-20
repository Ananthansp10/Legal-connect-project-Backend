import { Model } from "mongoose";
import { IBaseRepository } from "../repositoryInterface/IBaseRepository";


export class BaseRepository<T> implements IBaseRepository<T> {

    private _model: Model<T>

    constructor(model: Model<T>) {
        this._model = model
    }

    async findByEmail(email: string): Promise<T | null> {
        return await this._model.findOne({ email: email })
    }

    async findById(id: string): Promise<T | null> {
        return await this._model.findById(id)
    }

    async create(data: T): Promise<T> {
        return await this._model.create(data)
    }
}