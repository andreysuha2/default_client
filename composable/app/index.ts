import { useAppStore } from "~/store/app";
import type { ApiStatus } from "~/composable/app/types";
import { useOFetch } from "~/composable/fetch";
import type { GenerateOptions } from "generate-password"
import { useCurrentUser } from "~/composable/user";
import type { UserResponse } from "~/composable/user/types";

export const usePageLoader = () => {
    const store = useAppStore(),
        loading = computed(() => store.pageLoader),
        enable = () => { store.pageLoader = true; },
        disable = () => { store.pageLoader = false; };

    return { loading, enable, disable };
}

export const useApp = () => {
    const appStore = useAppStore(),
        currentUser = useCurrentUser(),
    
    loadStatus = async (): Promise<ApiStatus> => {
        return new Promise((resolve, reject) => {
            useOFetch('/api/status').then(status => {
                appStore.setStatus(status as ApiStatus);
                resolve(status as ApiStatus);
            }).catch(e => {
                console.error('API STATUS ERROR:', e);
                reject(e)
            });
        });
    },

    generatePassword = (config: GenerateOptions = {}): Promise<string> => {
        return new Promise((resolve, reject) => {
            useOFetch('/password/generate', { method: "GET", query: config })
                .then(data => resolve(data.password))
                .catch(e => reject(e));
        });
    },

    bootstrap = async (): Promise<Array<any>> => {
        const loadUser = async (): Promise<UserResponse | null> => {
            return new Promise((resolve, reject) => {
                currentUser.load()
                    .then(data => resolve(data))
                    .catch(e => reject(e))
            });
        }

        return Promise.allSettled([
            loadStatus(),
            loadUser()
        ])
    },

    pageLoader = usePageLoader();

    return { pageLoader, loadStatus, bootstrap, generatePassword };
}