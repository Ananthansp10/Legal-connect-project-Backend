export interface IAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface IUserProfileDataDto {
  name: string;
  email: string;
  phoneNumber: string;
  address: IAddress;
  profileImage: string;
  DOB: string;
  gender: string;
  profession: string;
  company: string;
}
