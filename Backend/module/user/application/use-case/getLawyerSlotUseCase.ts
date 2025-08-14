import { Types } from "mongoose";
import { IGetLawyerSlotRepository } from "../../infrastructure/repositoryInterface/IgetLawyerSlotRepository";
import { IGetLawyerSlotApplication } from "../use-case-interface/IGetLawyerSlotUseCase";
import { ISlotResponseDto } from "../../domain/dtos/slotResponseDto";



export class GetLawyerSlotUseCase implements IGetLawyerSlotApplication{

    constructor(
        private getLawyerSlotRepo:IGetLawyerSlotRepository
    ){}
}