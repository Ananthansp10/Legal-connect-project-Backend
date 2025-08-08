import { ISpecializationEntity } from "../../domain/entity/specializationEntity";
import { IAddSpecializationRepository } from "../../interface/repositories/IAddSpecializationRepository";
import { IAddSpecializationApplication } from "../use-case-interface/IAddSpecialisationApplication";



export class AddSpecializationApplication implements IAddSpecializationApplication{

    constructor(
        private addSpecialization:IAddSpecializationRepository
    ){}

    async execute(data: ISpecializationEntity): Promise<void> {
        await this.addSpecialization.addSpecialization(data)
    }
}