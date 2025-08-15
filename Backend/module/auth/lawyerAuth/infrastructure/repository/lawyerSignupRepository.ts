import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import { ILawyerSignupRepository } from "../repositoryInterface/lawyerSignupRepository";
import { LawyerModel } from "../models/lawyerModel";
import { BaseRepository } from "./baseRepository";


export class LawyerSignupRepository extends BaseRepository<ILawyerSignup> implements ILawyerSignupRepository{

    constructor(){
        super(LawyerModel)
    }
}