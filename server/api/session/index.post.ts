import { defaultResponseHandler } from "~/server/utils/responseHandler";
import { SessionTokenResponse } from "~/composable/session/types";
import { ResponseData } from "~/assets/js/http/types";

export default defineEventHandler(defaultResponseHandler<ResponseData, SessionTokenResponse>(async (event, auth): Promise<ResponseData<SessionTokenResponse>> => {
    const body = await readBody(event);
    return await auth.login(body.username, body.password);
}));