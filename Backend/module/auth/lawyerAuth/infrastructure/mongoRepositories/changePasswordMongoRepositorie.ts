import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import { IChangePasswordRepositorie } from "../../interface/repositories/IchangePasswordRepositorie";
import { LawyerModel } from "../models/lawyerModel";
import { BaseMongoRepositorie } from "./baseMongoRepositorie";


export class ChangePasswordMongoRepositorie extends BaseMongoRepositorie<ILawyerSignup> implements IChangePasswordRepositorie{

    constructor(){
        super(LawyerModel)
    }

    async changePassword(email: string, password: string): Promise<void> {
        await LawyerModel.updateOne({email:email},{$set:{password:password}})
    }
}