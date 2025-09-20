

export interface ITokenGeneration {
    generateAccessToken(payload: object): string;
    generateRefreshToken(payload: object): string;
}