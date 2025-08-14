import { Types } from "mongoose";
import { IGetLawyerSlotRepository } from "../../interface/repository/IgetLawyerSlotRepository";
import { IGetLawyerSlotApplication } from "../use-case-interface/IGetLawyerSlotUseCase";
import { ISlotResponseDto } from "../../domain/dtos/slotResponseDto";



export class GetLawyerSlotUseCase implements IGetLawyerSlotApplication{

    constructor(
        private getLawyerSlotRepo:IGetLawyerSlotRepository
    ){}

    async execute(lawyerId: string, date: string): Promise<ISlotResponseDto[] | null> {
        return await this.getLawyerSlotRepo.getLawyerSlotDetails(lawyerId,date)
    }
}