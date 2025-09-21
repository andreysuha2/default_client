import { ApiHTTP } from "~/assets/js/http/api";
import type { ResponseData } from "~/assets/js/http/types";
import Auth from "~/assets/js/auth";
import type {
    UsersListRequest,
    UserCreateRequest,
    UserUpdateRequest,
    UserResponse,
    UsersListResponse,
    CurrentGroupHttp
} from "~/composable/user/types";

export class UsersHttp extends ApiHTTP {
    constructor(auth: Auth | null = null) {
        super({ baseURL: "users" }, auth);
    }

    public list(filterQuery: UsersListRequest): Promise<ResponseData<UsersListResponse>> {
        return this.get('/', { data: filterQuery });
    }

    public create(user: UserCreateRequest): Promise<ResponseData<UserResponse>> {
        return this.post('/', { data: user });
    }

    public read(userId: number): Promise<ResponseData<UserResponse>> {
        return this.get(`/${userId}`);
    }

    public update(userId: number, user: UserUpdateRequest): Promise<ResponseData<UserResponse>> {
        return this.put(`/${userId}`, { data: user });
    }

    public remove(userId: number): Promise<ResponseData<UserResponse>> {
        return this.delete(`/${userId}`);
    }

    public restore(userId: number): Promise<ResponseData<UserResponse>> {
        return this.patch(`/${userId}/restore`);
    }

    get current(): CurrentGroupHttp {
        return this.group<CurrentGroupHttp>('/current', query => ({
            read: (): Promise<ResponseData<UserResponse>> => query.get('/'),
            update: (user: UserUpdateRequest): Promise<ResponseData<UserResponse>> => query.put("/", { data: user })
        }));
    }
}