import { ISpecializationEntity } from "../../domain/entity/specializationEntity";
import { IGetSpecializationRepository } from "../../interface/repositories/IGetSpecializationRepository";
import { IGetSpecializationApplication } from "../use-case-interface/IGetSpecializationApplication";



export class GetSpecializationApplication implements IGetSpecializationApplication{

    constructor(
        private getSpecializationRepo:IGetSpecializationRepository
    ){}

    async execute(): Promise<ISpecializationEntity[] | null> {

        return await this.getSpecializationRepo.getSpecialization()
    }
}