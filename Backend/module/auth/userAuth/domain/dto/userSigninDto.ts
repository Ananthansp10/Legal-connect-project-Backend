

export interface UserSigninDto{
    userData:{
        id:string;
        name:string;
        email:string,
        googleId ? :string
    };
    accessToken:string;
    refreshToken:string
}