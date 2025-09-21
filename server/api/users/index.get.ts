import { defaultResponseHandler } from "~/server/utils/responseHandler";
import { ResponseData } from "~/assets/js/http/types";
import { UsersHttp } from "~/assets/js/http/api/users";
import { UsersListResponse } from "~/composable/user/types";

export default defineEventHandler(defaultResponseHandler<ResponseData, UsersListResponse> (async (event, auth): Promise<ResponseData<UsersListResponse>> => {
    const usersHttp = new UsersHttp(auth),
        query: { [key: string]: string | Array<string> } = getQuery(event),
        perPage = query.perPage ? Number(query.perPage) : 10,
        page = query.perPage ? Number(query.page) : 1
    return await usersHttp.list({ page, perPage });
}));