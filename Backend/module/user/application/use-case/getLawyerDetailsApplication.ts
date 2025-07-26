import { LawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { IGetLawyerRepositorie } from "../../interface/repositorie/getLawyerRepositorie";
import { IGetLawyerDetailsApplication } from "../use-case-interface/IGetLawyerDetailsApplication";



export class GetLawyerDetailsApplication implements IGetLawyerDetailsApplication{

    constructor(
        private _getLawyerDetailsRepo:IGetLawyerRepositorie
    ){}

    async execute(lawyerId: string): Promise<LawyerProfileEntity | null> {
        return await this._getLawyerDetailsRepo.getLawyerById(lawyerId)
    }
}