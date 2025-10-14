import { Types } from "mongoose";
import { IAddSlotRepository } from "../../infrastructure/repositoryInterface/IAddSlotRepository";
import { IAddSlotUseCase } from "../use-case-interface/IAddSlotUseCase";
import { ISlotAvailablityRequestDto } from "../../domain/dtos/slotAvailablityDto";

export class AddSlotUseCase implements IAddSlotUseCase {
  constructor(private _addSlotRepo: IAddSlotRepository) {}

  async execute(
    lawyerId: Types.ObjectId,
    data: ISlotAvailablityRequestDto,
  ): Promise<void> {
    await this._addSlotRepo.addSlot({ ...data, lawyerId: lawyerId });
  }
}
