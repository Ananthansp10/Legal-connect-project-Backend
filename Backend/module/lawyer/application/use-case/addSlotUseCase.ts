import { Types } from "mongoose";
import { ISlotAvailablityEntity } from "../../domain/entity/slotAvailablityEntity";
import { IAddSlotRepository } from "../../infrastructure/repositoryInterface/IAddSlotRepository";
import { IAddSlotUseCase } from "../use-case-interface/IAddSlotUseCase";


export class AddSlotUseCase implements IAddSlotUseCase{

    constructor(
        private _addSlotRepo:IAddSlotRepository
    ){}

    async execute(lawyerId: Types.ObjectId, data: ISlotAvailablityEntity): Promise<void> {
        await this._addSlotRepo.addSlot({...data,lawyerId:lawyerId})
    }
}