

export interface ILawyerResponse{
    _id:string;
    name:string;
    email ? :string;
    specialization:string[];
    experience ? :string;
    barCouncilNumber?:string;
    documents?:string[];
    status:boolean;
    createdAt ? :Date;
}