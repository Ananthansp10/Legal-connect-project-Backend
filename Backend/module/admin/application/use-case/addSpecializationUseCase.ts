import { ISpecializationEntity } from "../../domain/entity/specializationEntity";
import { IAddSpecializationRepository } from "../../infrastructure/repositoryInterface/IAddSpecializationRepository";
import { IAddSpecializationUseCase } from "../use-case-interface/IAddSpecialisationUseCase";



export class AddSpecializationUseCase implements IAddSpecializationUseCase{

    constructor(
        private addSpecialization:IAddSpecializationRepository
    ){}

    async execute(data: ISpecializationEntity): Promise<void> {
        await this.addSpecialization.addSpecialization(data)
    }
}