

export interface IBaseRepository<T>{
    findByEmail(email:string):Promise<T | null>;
    findById(id:string):Promise<T | null>;
    findAll(startIndex:number,limit:number):Promise<{data:T[],totalData:number} | null>;
    findAllUnverifiedLawyer():Promise<T[] | null>;
}