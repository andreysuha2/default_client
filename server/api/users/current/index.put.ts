import { defaultResponseHandler } from "~/server/utils/responseHandler";
import { ResponseData } from "~/assets/js/http/types";
import { UserResponse, UserUpdateRequest } from "~/composable/user/types";
import { UsersHttp } from "assets/js/http/api/users";

export default defineEventHandler(defaultResponseHandler<ResponseData, UserResponse>(async (event, auth): Promise<ResponseData<UserResponse>> => {
    const usersHttp = new UsersHttp(auth),
        user: UserUpdateRequest = await readBody(event);
    return await usersHttp.current.update(user);
}));