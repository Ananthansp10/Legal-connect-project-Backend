import { IUserResponse } from "../../domain/dtos/userDto";


export interface IGetUsersApplication{
    execute():Promise<IUserResponse[]>;
}