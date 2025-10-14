import { Types } from "mongoose";
import { IGetSlotRepository } from "../../infrastructure/repositoryInterface/IGetSlotRepository";
import { IGetSlotUseCase } from "../use-case-interface/IGetSlotUseCase";
import { ISlotAvailablityResponseDto } from "../../domain/dtos/slotAvailablityDto";

export class GetSlotUseCase implements IGetSlotUseCase {
  constructor(private _getSlotRepository: IGetSlotRepository) {}

  async execute(
    lawyerId: Types.ObjectId,
    type: string,
  ): Promise<ISlotAvailablityResponseDto[] | null> {
    try {
      return await this._getSlotRepository.getSlot(lawyerId, type);
    } catch (error) {
      throw error;
    }
  }
}
