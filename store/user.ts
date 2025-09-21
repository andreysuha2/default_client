import { defineStore } from "pinia";
import type { UserResponse } from "~/composable/user/types";

interface UserData extends UserResponse {}

interface State {
    session: { checked: boolean },
    user: UserData | null,
}

export const useUserStore = defineStore("user", {
    state: (): State => ({
        session: { checked: false },
        user: null
    }),
    actions: {
        setSessionCheck(state: boolean) { this.session.checked = state; },
        setUser(user: UserResponse | null) { this.user = user; },
        login(user: UserResponse) {
            this.setUser(user);
            this.setSessionCheck(true);
        },
        logout() {
            this.setUser(null);
            this.setSessionCheck(false);
        }
    }
})