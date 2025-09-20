import { IUserResponse } from "../../domain/dtos/userDto";


export interface IFilterUserUseCase {
    execute(status: string): Promise<IUserResponse[] | null>;
}