

export interface Address{
    street:string;
    city:string;
    state:string;
    country:string;
    zipCode:string;
}


export interface UserProfileDataDto{
    name: string;
    email: string;
    phoneNumber: string;
    address: Address;
    profileImage: string;
    DOB:string;
    gender:string;
    profession:string;
    company:string;
}