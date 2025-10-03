export interface IHashService {
  hash(data: string): Promise<string>;
}
