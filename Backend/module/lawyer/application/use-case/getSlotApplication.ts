import { Types } from "mongoose";
import { ISlotAvailablityEntity } from "../../domain/entity/slotAvailablityEntity";
import { IGetSlotRepository } from "../../infrastructure/repositoryInterface/IGetSlotRepository";
import { IGetSlotApplication } from "../use-case-interface/IGetSlotApplication";


export class GetSlotApplication implements IGetSlotApplication{
    
    constructor(
        private _getSlotRepository:IGetSlotRepository
    ){}

    async execute(lawyerId: Types.ObjectId,type:string): Promise<ISlotAvailablityEntity[] | null> {
        try {
            return await this._getSlotRepository.getSlot(lawyerId,type)
        } catch (error) {
            throw error
        }
    }
}