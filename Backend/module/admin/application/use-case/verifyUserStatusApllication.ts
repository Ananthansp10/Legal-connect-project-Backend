import { AppStatus } from "../../../../common/status/appStatus";
import { IUserRepositorie } from "../../interface/repositories/IuserRepositorie";
import { IVerifyUserStatusApplication } from "../use-case-interface/IVerifyUserStatusApplication";


export class VerifyUserStatusApplication implements IVerifyUserStatusApplication{

    constructor(
        private _userRepo:IUserRepositorie
    ){}

    async execute(userId: string, status: string): Promise<boolean> {
        try {
            await this._userRepo.updateUserStatus(userId,status)
            if(status==AppStatus.UNBLOCK){
                return false;
            }else{
                return true;
            }
        } catch (error) {
            throw error;
        }
    }
}