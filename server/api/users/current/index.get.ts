import { defaultResponseHandler } from "~/server/utils/responseHandler";
import { ResponseData } from "~/assets/js/http/types";
import { UserResponse } from "~/composable/user/types";
import { UsersHttp } from "assets/js/http/api/users";

export default defineEventHandler(defaultResponseHandler<ResponseData, UserResponse>(async (event, auth): Promise<ResponseData<UserResponse>> => {
    const usersHttp = new UsersHttp(auth);
    return await usersHttp.current.read();
}));