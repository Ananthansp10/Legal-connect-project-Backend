import { Types } from "mongoose";
import { ISlotAvailablityEntity } from "../../domain/entity/slotAvailablityEntity";
import { IAddSlotRepositorie } from "../../infrastructure/repositoryInterface/IAddSlotRepository";
import { IAddSlotApplication } from "../use-case-interface/IAddSlotApplication";


export class AddSlotApplication implements IAddSlotApplication{

    constructor(
        private addSlotRepo:IAddSlotRepositorie
    ){}

    async execute(lawyerId: Types.ObjectId, data: ISlotAvailablityEntity): Promise<void> {
        await this.addSlotRepo.addSlot({...data,lawyerId:lawyerId})
    }
}