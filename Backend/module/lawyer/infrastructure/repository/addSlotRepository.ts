import { ISlotAvailablityEntity } from "../../domain/entity/slotAvailablityEntity";
import { IAddSlotRepositorie } from "../repositoryInterface/IAddSlotRepository";
import { availableSlotModel } from "../models/slotAvailablityModel";


export class AddSlotRepositorie implements IAddSlotRepositorie{

    async addSlot(data: ISlotAvailablityEntity): Promise<void> {
        await availableSlotModel.create({...data,status:true})
    }
}