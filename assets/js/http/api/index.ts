import Http from "~/assets/js/http";
import type { HttpArgs, RequestData, ResponseData } from "~/assets/js/http/types";
import { decamelizeObject, camelizeObject } from "~/assets/js/helpers";
import Auth from "~/assets/js/auth";
import type { ApiStatus } from "~/composable/app/types";

export class ApiHTTP extends Http {
    private auth: Auth | null;

    constructor(args: HttpArgs, auth: Auth | null = null) {
        super({ ...args, baseURL: `${process.env.API_URL}/${args.baseURL}` });
        this.auth = auth;
        console.log("API url:", process.env.API_URL);
    }

    check(): Promise<ResponseData<ApiStatus>> {
        return this.get("");
    }

    protected override async preHandleRequest(request: RequestData): Promise<RequestData> {
        if (request.data && !(request.data instanceof FormData) && !(request.data instanceof URLSearchParams) && typeof request.data !== 'string') request.data = decamelizeObject(request.data);
        if (this.auth) {
            const accessToken = await this.auth.getAccessToken();
            if (accessToken) request.headers = { ...request.headers || {}, 'Authorization': `Bearer ${accessToken}` };
        }
        return Promise.resolve(request);
    }
    
    protected override preHandleResponse(response: ResponseData): Promise<ResponseData> {
        if(response.body) response.body = camelizeObject(response.body);
        return Promise.resolve(response);
    }
}

export const apiHTTP = new ApiHTTP({ baseURL: '' });