



export interface Address{
    street:string,
    city:string,
    state:string
    country:string,
    zipCode:string
}


export interface UserProfileEntitie{
    id ? :any
    userId:any,
    name:string,
    email:string,
    phoneNumber:string,
    gender:string,
    DOB:string,
    proffession:string,
    company:string,
    profileImage:string,
    address:Address
}