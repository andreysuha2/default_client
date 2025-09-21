import type { Paginator, PaginatorResponse } from "assets/js/helpers/types";
import type { ResponseData } from "~/assets/js/http/types";
import type { CrudModalsState, CrudModalState } from "~/composable/pages/types";

export enum UserRole {
    SUPER_ADMIN = "super_admin",
    ADMIN = "admin",
    USER = "user"
}

export type User = {
    id?: number,
    name: string,
    username: string,
    role: UserRole,
    createdAt: string,
    updatedAt: string | null,
    deletedAt: string | null,
}

export interface UserCreateRequest extends Omit<User, 'id'|'createdAt'|'updatedAt'|'deletedAt'> {
    password: string
}

export interface UserUpdateRequest extends Omit<User, 'createdAt'|'updatedAt'|'deletedAt'> {
    id: number,
    password?: string
}

export interface UserResponse extends User {
    id: number
}

export interface UsersListRequest extends Paginator {}

export interface UsersListResponse extends PaginatorResponse {
    users: UserResponse[]
}

export interface CurrentGroupHttp {
    read: () => Promise<ResponseData<UserResponse>>;
    update: (user: UserUpdateRequest) => Promise<ResponseData<UserResponse>>
}