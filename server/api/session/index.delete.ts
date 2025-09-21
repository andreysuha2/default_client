import { defaultResponseHandler } from "~/server/utils/responseHandler";
import { SessionHTTP } from "~/assets/js/http/api/session";
import { ResponseData } from "~/assets/js/http/types";
import { SessionDeleteResponse } from "~/composable/session/types";

export default defineEventHandler(defaultResponseHandler<ResponseData, SessionDeleteResponse>(async (event, auth): Promise<ResponseData<SessionDeleteResponse>> => {
    const sessionHTTP = new SessionHTTP(auth),
        resp = await sessionHTTP.remove();
    await auth.setAccessToken(null);
    await auth.setRefreshToken(null);
    return resp;
}));