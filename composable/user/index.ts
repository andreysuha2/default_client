import { useAppSession } from "~/composable/session";
import { useOFetch } from "~/composable/fetch";
import { useUserStore } from "~/store/user";
import type {
    UserRole,
    UserResponse,
    UsersListResponse,
    UsersListRequest,
    UserCreateRequest, UserUpdateRequest
} from "~/composable/user/types";


export const useCurrentUser = () => {
    const apiPath = '/api/users/current',
        session = useAppSession(),
        store = useUserStore(),
        isAuth = computed(() => store.session.checked),
        data = computed(() => store.user),
        roleIn = (list: Array<UserRole | "guest">): boolean => list.includes(store.user?.role || "guest"),
        roleNotIn = (list: Array<UserRole | "guest">): boolean => !list.includes(store.user?.role || "guest"),
        load = (): Promise<UserResponse> => {
            return new Promise((resolve, reject) => {
                useOFetch(apiPath, { method: "GET" })
                    .then(data => {
                        store.login(data as UserResponse);
                        resolve(data as UserResponse)
                    })
                    .catch(e => reject(e));
            });
        },
        login = (username: string, password: string): Promise<UserResponse> => {
            return new Promise((resolve, reject) => {
                session.create(username, password)
                    .then(data => load())
                    .then(data => resolve(data))
                    .catch(e => reject(e));
            });
        },
        logout = (): Promise<UserResponse | null> => {
            return new Promise((resolve, reject) => {
                session.remove()
                    .then(() => {
                        const user = store.user;
                        store.logout();
                        resolve(user);
                    }).catch(e => reject(e));
            })
        };

    return { apiPath, store, isAuth, data, roleIn, roleNotIn, load, login, logout }
};

export const useUsers = () => {
    const apiPath = '/api/users',
        list = (query: UsersListRequest = { page: 1, perPage: 10 }): Promise<UsersListResponse> => {
            return new Promise((resolve, reject) => {
                useOFetch(apiPath, { method: "GET", query })
                    .then(data => resolve(data))
                    .catch(e => reject(e));
            })
        },
        create = (user: UserCreateRequest): Promise<UserResponse> => {
            return new Promise((resolve, reject) => {
                useOFetch(apiPath, { method: "POST", body: JSON.stringify(user) })
                    .then(data => resolve(data))
                    .catch(e => reject(e));
            });
        },
        read = (userId: number): Promise<UserResponse> => {
            return new Promise((resolve, reject) => {
                useOFetch(`${apiPath}/${userId}`, { method: "GET" })
                    .then(data => resolve(data))
                    .catch(e => reject(e));
            });
        },
        update = (userId: number, user: UserUpdateRequest): Promise<UserResponse> => {
            return new Promise((resolve, reject) => {
                useOFetch(`${apiPath}/${userId}`, { method: "PUT", body: user })
                    .then(data => resolve(data))
                    .catch(e => reject(e));
            });
        },
        remove = (userId: number): Promise<UserResponse> => {
            return new Promise((resolve, reject) => {
                useOFetch(`${apiPath}/${userId}`, { method: "DELETE" })
                    .then(data => resolve(data))
                    .catch(e => reject(e));
            });
        },
        restore = (userId: number): Promise<UserResponse> => {
            return new Promise((resolve, reject) => {
                useOFetch(`${apiPath}/${userId}/restore`, { method: "PATCH" })
                    .then(data => resolve(data))
                    .catch(e => reject(e));
            });
        };

    return { apiPath, list, create, read, update, remove, restore };
};