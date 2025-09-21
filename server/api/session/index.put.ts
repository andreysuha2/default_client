import { defaultResponseHandler } from "~/server/utils/responseHandler";
import { ResponseData } from "~/assets/js/http/types";
import { SessionTokenResponse } from "~/composable/session/types";

export default defineEventHandler(defaultResponseHandler<ResponseData, SessionTokenResponse>(async (event, auth): Promise<ResponseData<SessionTokenResponse | null>> => {
    return auth.refreshAccessToken();
}));