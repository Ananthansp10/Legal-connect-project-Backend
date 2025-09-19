import { IUserResponse } from "../../domain/dtos/userDto";


export interface IGetUsersUseCase{
    execute(startIndex:number,limit:number):Promise<{data:IUserResponse[],totalData:number}>;
}