import { Types } from "mongoose";
import { ISlotAvailablityEntity } from "../../domain/entity/slotAvailablityEntity";
import { IAddSlotRepositorie } from "../../interface/repositorie/addSlotRepositorie";
import { availableSlotModel } from "../models/slotAvailablityModel";
import { AddNewSlot, AddNewTime } from "../../domain/dtos/slotDtos";



export class AddSlotMongoRepositorie implements IAddSlotRepositorie{

    async findSlot(lawyerId: Types.ObjectId): Promise<ISlotAvailablityEntity | null> {
        return await availableSlotModel.findOne({lawyerId:lawyerId})
    }

    async addSlot(data:ISlotAvailablityEntity): Promise<void> {
         await availableSlotModel.create(data)
    }

    async addNewSlot(lawyerId: Types.ObjectId, slot: AddNewSlot): Promise<void> {
        await availableSlotModel.updateOne({lawyerId:lawyerId},{$push:{availablity:slot}})
    }

    async addNewTime(lawyerId: Types.ObjectId, currentDate:Date, time: AddNewTime): Promise<void> {
        await availableSlotModel.updateOne(
            {lawyerId:lawyerId,"availablity.date":currentDate},
            {$push:{"availablity.$.timeSlots":time}}
        )
    }
}