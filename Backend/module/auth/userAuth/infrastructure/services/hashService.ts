import { IHashService } from "./IhashService";
import bcrypt from 'bcrypt'

export class HashService implements IHashService {

    async hash(data: string): Promise<string> {
        let hashedData: string = await bcrypt.hash(data, 10)
        return hashedData;
    }
}