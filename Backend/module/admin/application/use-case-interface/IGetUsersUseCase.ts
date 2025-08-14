import { IUserResponse } from "../../domain/dtos/userDto";


export interface IGetUsersUseCase{
    execute():Promise<IUserResponse[]>;
}