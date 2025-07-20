export interface IUserSignup{
    name:string;
    email:string;
    password ? :string;
    phoneNumber ? :number;
    isActive:boolean;
    _id ? :string;
    googleId ? :string;
    isBlock:boolean;
}