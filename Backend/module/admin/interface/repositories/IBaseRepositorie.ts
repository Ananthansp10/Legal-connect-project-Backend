

export interface IBaseRepositorie<T>{
    findByEmail(email:string):Promise<T | null>;
    findById(id:string):Promise<T | null>;
    findAll():Promise<T[] | null>;
    findAllUnverifiedLawyer():Promise<T[] | null>;
}