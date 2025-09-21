import { SessionHTTP } from "~/assets/js/http/api/session";
import type { ResponseData } from "~/assets/js/http/types";

export interface Token {
    token: string,
    expiredAt: string
}
interface setCookie {
    (name: string, value: string, options?: { [key: string]: any }): void
}

interface Cookie {
    [ key: string ]: string
}

export default class Auth {
    private setCookie: setCookie;
    private cookie: Cookie;
    private session: SessionHTTP;
    private accessTokenCookieName = "access_token";
    private refreshTokenCookieName = "refresh_token";

    constructor(setCookie: setCookie, cookie: Cookie, session: SessionHTTP) {
        this.setCookie = setCookie;
        this.cookie = cookie;
        this.session = session;
    }

    private setToken(tokenName: string, tokenValue: Token | null): Promise<null> {
        const cookieExpired = tokenValue ? new Date(`${tokenValue.expiredAt}`) : new Date();
        this.setCookie(tokenName, JSON.stringify(tokenValue?.token), { httpOnly: true, expires: cookieExpired });
        return Promise.resolve(null);
    }

    public async getAccessToken(): Promise<string | null> {
        if(!this.cookie[this.accessTokenCookieName]) {
            try {
                const resp = await this.refreshAccessToken();
                if (resp?.body) {
                    return Promise.resolve(resp.body.accessToken);
                } else return Promise.resolve(null);   
            } catch(e: any) {
                if (e.code && e.code === 401) return Promise.resolve(null)
            }
        }
        return Promise.resolve(this.cookie[this.accessTokenCookieName] ? JSON.parse(this.cookie[this.accessTokenCookieName]) : null);
    }

    public setAccessToken(token: Token | null): Promise<null> {
        return this.setToken(this.accessTokenCookieName, token);
    }

    public getRefreshToken(): Promise<string | null> {
        return Promise.resolve(this.cookie[this.refreshTokenCookieName] ? JSON.parse(this.cookie[this.refreshTokenCookieName]) : null);
    }

    public setRefreshToken(token: Token | null): Promise<null> {
        return this.setToken(this.refreshTokenCookieName, token);
    }

    public refreshAccessToken(): Promise<ResponseData> {
        return new Promise(async (resolve, reject) => {
            const refreshToken = await this.getRefreshToken();
            if(refreshToken) {
                try {
                    const resp = await this.session.update(refreshToken);
                    if(resp.body) {
                        await this.setAccessToken({ token: resp.body.accessToken, expiredAt: resp.body.accessExpiredAt });
                        await this.setRefreshToken({ token: resp.body.refreshToken, expiredAt: resp.body.refreshExpiredAt });
                        resolve(resp);
                    } else throw Error('Refresh failed');
                } catch (e) {
                    reject(e)
                }
            } else reject({ code: 401, error: "Refresh token not found!" });
        });
    }

    public async login(username: string, password: string): Promise<ResponseData> {
        return this.session.create(username, password)
            .then(async (resp: ResponseData) => {
                if(resp.body) {
                    await this.setAccessToken({ token: resp.body.accessToken, expiredAt: resp.body.accessExpiredAt });
                    await this.setRefreshToken({ token: resp.body.refreshToken, expiredAt: resp.body.refreshExpiredAt });
                } else throw Error("Auth request failed!");
                return resp;
            })
    }
}