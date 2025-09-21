export enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    HEAD = 'HEAD',
    PATCH = 'PATCH',
    CONNECT = 'CONNECT',
    TRACE = 'TRACE'
}

export interface HttpArgs {
    baseURL: string,
    headers?: { [key: string]: any },
    config?: { [key: string]: any }
}

export interface RequestData {
    method?: Methods,
    data?: { [key: string]: any } | Array<any> | string | FormData | URLSearchParams,
    headers?: { [key: string]: any },
    config?: { [key: string]: any }
}

export interface RequestConfig {
    method: Methods,
    headers: RequestData["headers"],
    [key: string]: any
}

export interface ResponseData<T = any> {
    status: number,
    body?: T,
    headers?: { [key: string]: any }
}

export type GroupQueryMethods = {
    request: (slug?: string, config?: RequestData) => Promise<ResponseData<any>>;
    get: (slug?: string, config?: RequestData) => Promise<ResponseData<any>>;
    post: (slug?: string, config?: RequestData) => Promise<ResponseData<any>>;
    put: (slug?: string, config?: RequestData) => Promise<ResponseData<any>>;
    delete: (slug?: string, config?: RequestData) => Promise<ResponseData<any>>;
};

export type GroupQueryFunction = <T>(groupPath: string, handler: GroupQueryHandler<T>) => T;

export type GroupQueryHandler<T> = (query: GroupQueryMethods, group: GroupQueryFunction) => T;