import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import { IChangePasswordRepository } from "../repositoryInterface/IchangePasswordRepository";
import { LawyerModel } from "../models/lawyerModel";
import { BaseRepository } from "./baseRepository";


export class ChangePasswordRepository extends BaseRepository<ILawyerSignup> implements IChangePasswordRepository{

    constructor(){
        super(LawyerModel)
    }

    async changePassword(email: string, password: string): Promise<void> {
        await LawyerModel.updateOne({email:email},{$set:{password:password}})
    }
}