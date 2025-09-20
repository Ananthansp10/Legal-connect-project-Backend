import { ISlotAvailablityEntity } from "../../domain/entity/slotAvailablityEntity";
import { IAddSlotRepository } from "../repositoryInterface/IAddSlotRepository";
import { availableSlotModel } from "../models/slotAvailablityModel";


export class AddSlotRepository implements IAddSlotRepository {

    async addSlot(data: ISlotAvailablityEntity): Promise<void> {
        await availableSlotModel.create({ ...data, status: true })
    }
}