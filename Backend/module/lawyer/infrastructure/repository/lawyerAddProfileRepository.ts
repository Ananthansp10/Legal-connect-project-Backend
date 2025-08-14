import { LawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";
import { ILawyerAddProfile } from "../repositoryInterface/ILawyerAddProfileRepository";
import { lawyerProfileModel } from "../models/lawyerProfileModel";
import { BaseRepository } from "./baseRepository";


export class LawyerAddProfileRepository extends BaseRepository<LawyerProfileEntity> implements ILawyerAddProfile{

    constructor(){
        super(lawyerProfileModel)
    }
}