import type { ApiStatus } from "~/composable/app/types";
import { defineStore } from "pinia";

interface State {
    pageLoader: boolean,
    menuDisplay: boolean,
    status: ApiStatus | null,
    sessionCheck: boolean
}

export const useAppStore = defineStore('app', {
    state: (): State => ({
        pageLoader: false,
        menuDisplay: false,
        status: null,
        sessionCheck: false
    }),
    actions: {
        setStatus(status: ApiStatus | null) { this.status = status; },
        showMenu() { this.menuDisplay = true; },
        hideMenu() { this.menuDisplay = false; },
        toggleMenu(state?: boolean) { 
            if(state === undefined) this.menuDisplay = !this.menuDisplay;
            else this.menuDisplay = state;
        }
    }
});