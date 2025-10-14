import { Model } from "mongoose";
import { IBaseRepository } from "../repositoryInterface/IbaseRepository";

export class BaseRepository<T> implements IBaseRepository<T> {
  private _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  async findById(id: string): Promise<T | null> {
    return await this._model.findById(id);
  }

  async findByEmail(email: string): Promise<T | null> {
    return await this._model.findOne({ email: email });
  }

  async create(data: T): Promise<T | null> {
    return await this._model.create(data);
  }
}
