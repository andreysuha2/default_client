import { defaultResponseHandler } from "~/server/utils/responseHandler";
import { SessionHTTP } from "~/assets/js/http/api/session";
import { ResponseData } from "~/assets/js/http/types";
import { SessionReadResponse } from "~/composable/session/types";

export default defineEventHandler(defaultResponseHandler<ResponseData, SessionReadResponse>(async (event, auth): Promise<ResponseData<SessionReadResponse>> => {
    const sessionHTTP = new SessionHTTP(auth);
    return await sessionHTTP.read();
}));