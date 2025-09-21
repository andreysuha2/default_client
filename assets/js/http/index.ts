import type {
    HttpArgs,
    RequestConfig,
    RequestData,
    ResponseData,
    GroupQueryMethods,
    GroupQueryFunction,
    GroupQueryHandler
} from "./types";
import { Methods } from "./types";

export default class Http {
    protected baseURL: HttpArgs["baseURL"];
    protected headers: HttpArgs["headers"];
    protected config: HttpArgs["config"];

    constructor({ baseURL, headers = {}, config = {} }: HttpArgs) {
        this.baseURL = !baseURL.startsWith("http://") && !baseURL.startsWith("https://") ? `https://${baseURL}` : baseURL;
        this.headers = { 'Content-Type': 'application/json', ...headers };
        this.config = config;
    }

    static filterSlashes(url: string) {
        const [ protocol, domain ] = url.split("://"),
            domainParts = domain.split('/'),
            lastElm = domain.slice(-1)[0] === '/' ? "/" : "",
            domainFiltredParts = domainParts.filter(part => part);
        return `${protocol}://${domainFiltredParts.join('/')}${lastElm}`  
    }

    public async request(slug: string = '', { method = Methods.GET, data = {}, headers = {}, config = {} }: RequestData): Promise<ResponseData> {
        const likeGET = [ Methods.GET, Methods.HEAD ],
            baseURL = Http.filterSlashes(`${this.baseURL}/${slug}`),
            { method: handledMethod, data: handledData, headers: handledHeaders, config: handledConfig } = await this.preHandleRequest({ method, data, headers, config }),
            url: string = likeGET.includes(handledMethod || Methods.GET) ? `${baseURL}?${ handledData instanceof FormData ? '' : new URLSearchParams(handledData).toString()}` : baseURL,
            requestConfig: RequestConfig = { method: handledMethod || Methods.GET, headers: { ...this.headers, ...handledHeaders }, ...this.config, ...handledConfig };
            if(!likeGET.includes(method)) {
                const requestData = handledData instanceof FormData || handledData instanceof URLSearchParams ? handledData : JSON.stringify(handledData);
                requestConfig.body = requestData;
            }
            const self: Http = this;
        return new Promise(async (resolve, reject) => {
            fetch(url, requestConfig).then(async (response) => {
                const result = response.body ? await response.json() : {},
                    res = await self.preHandleResponse({ ...response, status: response.status, headers: response.headers, body: result });
                if(!response.ok) return reject(res);
                resolve(res);
            }).catch(e => reject(e));
        });
    }

    protected preHandleRequest(request: RequestData): Promise<RequestData> {
        return Promise.resolve(request);
    }

    protected preHandleResponse(response: ResponseData): Promise<ResponseData> {
        return Promise.resolve(response);
    }

    public get(slug: string = '', config: RequestData = {}) { return this.request(slug, { ...config, method: Methods.GET }); }

    public post(slug: string = '', config: RequestData = {}) { return this.request(slug, { ...config, method: Methods.POST }); }

    public put(slug: string = '', config: RequestData = {}) { return this.request(slug, { ...config, method: Methods.PUT }); }

    public delete(slug: string = '', config: RequestData = {}) { return this.request(slug, { ...config, method: Methods.DELETE }); }

    public patch(slug: string = '', config: RequestData = {}) { return this.request(slug, { ...config, method: Methods.PATCH }); }

    public group<T>(groupPath: string,  handler: GroupQueryHandler<T> ): T {
        const __this = this,
            getPath = (path: string) => path ? `${groupPath}/${path}` : groupPath,
            group: GroupQueryFunction = (path, handler) => __this.group(`${groupPath}/${path}`, handler),
            query: GroupQueryMethods = {
                request: (slug: string = '', config: RequestData = {}) => __this.request(slug, config),
                get: (slug: string = '', config: RequestData = {}) => __this.get(getPath(slug), config),
                post: (slug: string = '', config: RequestData = {}) => __this.post(getPath(slug), config),
                put: (slug: string = '', config: RequestData = {}) => __this.put(getPath(slug), config),
                delete: (slug: string = '', config: RequestData = {}) => __this.delete(getPath(slug), config),
            };
        return handler(query, group);
    }
}