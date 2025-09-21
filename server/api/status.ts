import { apiHTTP } from "~/assets/js/http/api";
import { ResponseData } from "~/assets/js/http/types";
import type { ApiStatus } from "~/composable/app/types";
import { defaultResponseHandler } from "~/server/utils/responseHandler";

export default defineEventHandler(defaultResponseHandler<ResponseData, ApiStatus>(async (): Promise<ResponseData<ApiStatus>> => {
    return await apiHTTP.check()
}));