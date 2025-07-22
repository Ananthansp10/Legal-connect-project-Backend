import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import { ILawyerSigninRepositorie } from "../../interface/repositories/lawyerSigninRepositorie";
import { LawyerModel } from "../models/lawyerModel";
import { BaseMongoRepositorie } from "./baseMongoRepositorie";


export class LawyerSigninMongoRepositorie extends BaseMongoRepositorie<ILawyerSignup> implements ILawyerSigninRepositorie{

    constructor(){
        super(LawyerModel)
    }
}