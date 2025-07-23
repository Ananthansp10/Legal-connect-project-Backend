import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import { ILawyerSignupRepositorie } from "../../interface/repositories/lawyerSignupRepositorie";
import { LawyerModel } from "../models/lawyerModel";
import { BaseMongoRepositorie } from "./baseMongoRepositorie";


export class LawyerSignupMongoRepositorie extends BaseMongoRepositorie<ILawyerSignup> implements ILawyerSignupRepositorie{

    constructor(){
        super(LawyerModel)
    }
}