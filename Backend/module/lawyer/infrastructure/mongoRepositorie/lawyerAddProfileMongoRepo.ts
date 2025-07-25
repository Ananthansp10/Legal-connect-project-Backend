import { LawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";
import { ILawyerAddProfile } from "../../interface/repositorie/lawyerAddProfileRepositorie";
import { lawyerProfileModel } from "../models/lawyerProfileModel";
import { BaseMongoRepositorie } from "./baseMongoRepositorie";


export class LawyerAddProfileMongoRepo extends BaseMongoRepositorie<LawyerProfileEntity> implements ILawyerAddProfile{

    constructor(){
        super(lawyerProfileModel)
    }
}