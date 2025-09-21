import { ResponseData } from "assets/js/http/types";
import { defaultResponseHandler } from "~/server/utils/responseHandler";
import password from "generate-password"

export default defineEventHandler(defaultResponseHandler<ResponseData, { password: string }>(async (event, auth): Promise<ResponseData<{ password: string }>> => {
    const query: { [key: string]: string | Array<string> } = getQuery(event);
    return { status: 200, body: { password: password.generate({ ...query }) } }
}));