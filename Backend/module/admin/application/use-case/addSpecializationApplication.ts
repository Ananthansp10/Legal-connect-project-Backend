import { ISpecializationEntity } from "../../domain/entity/specializationEntity";
import { IAddSpecializationRepositorie } from "../../interface/repositories/IAddSpecializationRepositorie";
import { IAddSpecializationApplication } from "../use-case-interface/IAddSpecialisationApplication";



export class AddSpecializationApplication implements IAddSpecializationApplication{

    constructor(
        private addSpecialization:IAddSpecializationRepositorie
    ){}

    async execute(data: ISpecializationEntity): Promise<void> {
        await this.addSpecialization.addSpecialization(data)
    }
}