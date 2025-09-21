export enum SessionTokenTypes {
    BEARER = 'bearer'
};

export type SessionReadResponse = { [key: string]: boolean };

export type SessionDeleteResponse = { [key: string]: string };

export type SessionTokenResponse = {
    accessToken: string,
    accessExpiredAt: string,
    refreshToken: string,
    refreshExpiredAt: string,
    tokenType: SessionTokenTypes
};