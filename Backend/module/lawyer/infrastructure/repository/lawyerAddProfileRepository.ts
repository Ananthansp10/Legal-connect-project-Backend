import { LawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";
import { ILawyerAddProfile } from "../repositoryInterface/ILawyerAddProfileRepository";
import { lawyerProfileModel } from "../models/lawyerProfileModel";
import { BaseRepositorie } from "./baseRepository";


export class LawyerAddProfileRepository extends BaseRepositorie<LawyerProfileEntity> implements ILawyerAddProfile{

    constructor(){
        super(lawyerProfileModel)
    }
}