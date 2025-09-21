import { defaultResponseHandler } from "~/server/utils/responseHandler";
import { ResponseData } from "~/assets/js/http/types";
import { UsersHttp } from "~/assets/js/http/api/users";
import { UserResponse } from "~/composable/user/types";

export default defineEventHandler(defaultResponseHandler<ResponseData, UserResponse> (async (event, auth): Promise<ResponseData<UserResponse>> => {
    const usersHttp = new UsersHttp(auth),
        userId = Number(getRouterParam(event, "userId"));
    return await usersHttp.remove(userId);
}));