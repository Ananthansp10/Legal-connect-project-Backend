import { Types } from "mongoose";
import { ISlotAvailablityEntity } from "../../domain/entity/slotAvailablityEntity";
import { IGetSlotRepository } from "../repositoryInterface/IGetSlotRepository";
import { availableSlotModel } from "../models/slotAvailablityModel";

export class GetSlotRepository implements IGetSlotRepository {
  async getSlot(
    lawyerId: Types.ObjectId,
    type: string,
  ): Promise<ISlotAvailablityEntity[] | null> {
    if (type == "all") {
      return await availableSlotModel.find({ lawyerId: lawyerId });
    } else if (type == "enabled") {
      return await availableSlotModel.find({
        lawyerId: lawyerId,
        status: true,
      });
    } else {
      return await availableSlotModel.find({
        lawyerId: lawyerId,
        status: false,
      });
    }
  }
}
