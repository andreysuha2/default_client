import type { NitroFetchRequest, NitroFetchOptions, TypedInternalResponse, ExtractedRouteMethod } from 'nitropack';
import { appendResponseHeader, H3Event } from 'h3';
import type {ServerError} from "~/composable/serverErrorHandler/types";

export const useOFetch = async <T, R extends NitroFetchRequest = NitroFetchRequest, O extends NitroFetchOptions<R> = NitroFetchOptions<R>> (
    url: R,
    config: O = { headers: {} } as O
): Promise<TypedInternalResponse<R, T, ExtractedRouteMethod<R, O>>> => {
    try {
        const headers = useRequestHeaders(['cookie']),
            nuxtApp = useNuxtApp(),
            event: H3Event | undefined = useRequestEvent(nuxtApp);

        const res = await $fetch.raw<T, R, O>(url, { ...config, headers: { ...config.headers, ...headers } }),
            cookies = (res.headers.get('set-cookie') || '').split(/,(?=\s*[^;]+=)/);

        if (event) {
            for (const cookie of cookies)  {
                appendResponseHeader(event, 'set-cookie', cookie);
            }
        }

        return (typeof res._data === 'object' && res._data ? reactive(res._data) : res._data) as TypedInternalResponse<R, T, ExtractedRouteMethod<R, O>>
    } catch (e) {
        throw e as ServerError;
    }
}