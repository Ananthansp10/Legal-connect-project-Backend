import { ISpecializationEntity } from "../../domain/entity/specializationEntity";
import { IGetSpecializationRepositorie } from "../../interface/repositories/IGetSpecializationRepositorie";
import { IGetSpecializationApplication } from "../use-case-interface/IGetSpecializationApplication";



export class GetSpecializationApplication implements IGetSpecializationApplication{

    constructor(
        private getSpecializationRepo:IGetSpecializationRepositorie
    ){}

    async execute(): Promise<ISpecializationEntity[] | null> {

        return await this.getSpecializationRepo.getSpecialization()
    }
}