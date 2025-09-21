import { defaultResponseHandler } from "~/server/utils/responseHandler";
import { ResponseData } from "~/assets/js/http/types";
import { UsersHttp } from "~/assets/js/http/api/users";
import { UserResponse, UserUpdateRequest} from "~/composable/user/types";

export default defineEventHandler(defaultResponseHandler<ResponseData, UserResponse> (async (event, auth): Promise<ResponseData<UserResponse>> => {
    const usersHttp = new UsersHttp(auth),
        user: UserUpdateRequest = await readBody(event),
        userId = Number(getRouterParam(event, 'userId'));
    return await usersHttp.update(userId, user);
}));