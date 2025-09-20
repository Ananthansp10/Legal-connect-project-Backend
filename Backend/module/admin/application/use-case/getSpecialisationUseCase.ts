import { SpecializationResponseDto } from "../../domain/dtos/specializationDto";
import { IGetSpecializationRepository } from "../../infrastructure/repositoryInterface/IGetSpecializationRepository";
import { IGetSpecializationUseCase } from "../use-case-interface/IGetSpecializationUseCase";



export class GetSpecializationUseCase implements IGetSpecializationUseCase {

    constructor(
        private _getSpecializationRepo: IGetSpecializationRepository
    ) { }

    async execute(): Promise<SpecializationResponseDto[] | null> {

        return await this._getSpecializationRepo.getSpecialization()
    }
}