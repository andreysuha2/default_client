import { ApiHTTP } from "~/assets/js/http/api";
import type { ResponseData } from "~/assets/js/http/types";
import Auth from "~/assets/js/auth";
import type { SessionDeleteResponse, SessionReadResponse, SessionTokenResponse } from "~/composable/session/types";

export class SessionHTTP extends ApiHTTP {
    constructor(auth: Auth | null = null) {
        super({ baseURL: "session" }, auth);
    }

    create(login: string, password: string): Promise<ResponseData<SessionTokenResponse>> {
        const data = new URLSearchParams({ username: login, password: password })
        return this.post("", { data, headers: { "Content-Type": "application/x-www-form-urlencoded" } });
    }

    read(): Promise<ResponseData<SessionReadResponse>> {
        return this.get("");
    }

    update(refreshToken: string): Promise<ResponseData<SessionTokenResponse>> {
        return this.put("", { headers: { "Authorization": `Bearer ${refreshToken}` } });
    }

    remove(): Promise<ResponseData<SessionDeleteResponse>> {
        return this.delete("");
    }
}