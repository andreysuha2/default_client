import type { SessionDeleteResponse, SessionTokenResponse, SessionReadResponse } from "./types";

export const useAppSession = () => {
    const apiPath = '/api/session',
        create = (username: string, password: string): Promise<SessionTokenResponse> => {
            return new Promise((resolve, reject) => {
                $fetch(apiPath, { method: 'POST', body: { username, password } })
                    .then(data => resolve(data))
                    .catch(error => reject(error));
            });
        },

        read = (): Promise<SessionReadResponse> => {
            return new Promise((resolve, reject) => {
                $fetch(apiPath, { method: "GET" })
                    .then(data => resolve(data))
                    .catch(error => reject(error));
            });
        },

        update = (): Promise<SessionTokenResponse | null> => {
            return new Promise((resolve, reject) => {
                $fetch(apiPath, { method: 'PUT' })
                    .then(data => resolve(data))
                    .catch(error => reject(error));
            });
        },

        remove = (): Promise<SessionDeleteResponse> => {
            return new Promise((resolve, reject) => {
                $fetch(apiPath, { method: "DELETE" })
                    .then(data => resolve(data))
                    .catch(error => reject(error));
            })
        }

        return { create, read, update, remove }
};
