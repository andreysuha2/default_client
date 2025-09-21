import type {PageData, PageDataList, PageDataOptions, CrudModalsState, CrudModalState} from "./types";
import { useCurrentUser } from "~/composable/user";
import { useLocalePath } from "#i18n";
import type { RouteLocationRaw } from "vue-router";
import type { UnwrapRef } from "vue";
import { UserRole } from "~/composable/user/types";

const createPageData = (options: PageDataOptions): PageData => ({
    ...options,
    menu: {
        use: options.menu?.use ?? true,
        label: options.menu?.label || options.label,
        icon: options.menu?.icon || options.icon
    },
    page: {
        label: options.page?.label || options.label,
        icon: options.page?.icon || options.icon
    }
});

export const usePages = () => {
    const { t } = useI18n(),
        localePath = useLocalePath(),
        currentUser = useCurrentUser(),
        list: PageDataList = {
            home: createPageData({
                label: t("pages.home.title"),
                icon: "i-heroicons-home-20-solid",
                to: (data = {}): RouteLocationRaw => localePath({ name: 'HomePage', ...data }),
                menu: { use: false }
            }),
            login: createPageData({
                label: t("pages.login.title"),
                icon: "i-heroicons-arrow-left-on-rectangle-solid",
                to: (data = {}): RouteLocationRaw => localePath({ name: 'LoginPage', ...data }),
                menu: { use: false }
            }),
            profile: createPageData({
                label: t("pages.profile.title"),
                icon: "i-heroicons-user-circle",
                to: (data = {}): RouteLocationRaw => localePath({ name: 'ProfilePage', ...data }),
                menu: { use: false }
            }),
            users: createPageData({
                label: t("pages.users.title"),
                icon: "i-heroicons-user-group-solid",
                to: (data = {}): RouteLocationRaw => localePath({  name: 'UsersPage', ...data }),
                menu: {
                    use: currentUser.roleIn([ UserRole.SUPER_ADMIN, UserRole.ADMIN ]),
                    label: t("pages.users.inMenu")
                }
            })
        };

    return { list }
}

export const useCrudModalsState = <T, K extends string>(itemName: K, useRestore: boolean = false): {
    states: UnwrapRef<CrudModalsState<T, K>>
    setModal: (modalName: keyof CrudModalsState<T, K>, openValue: boolean, item: T | null) => void,
    openModal: (modalName: keyof CrudModalsState<T, K>, item: T | null) => void,
    closeModal: (modalName: keyof CrudModalsState<T, K>) => void,
} => {
    const createState = (): CrudModalState<T, K> => ({ open: false, [itemName]: null } as CrudModalState<T, K>),
        states = reactive({
            create: { open: false },
            update: createState(),
            info: createState(),
            remove: createState(),
            ...useRestore ? { restore: createState() } : {}
        }),
        setModal = (modalName: keyof CrudModalsState<T, K>, openValue: boolean, item: T | null = null) => {
            if(states[modalName] && typeof states[modalName] === "object") {
                (states[modalName] as { open: boolean } & Record<K, T | null>).open = openValue;
                if(itemName in states[modalName]) (states[modalName] as Record<K, T | null>)[itemName] = item;
            }
        },
        openModal = (modalName: keyof CrudModalsState<T, K>, item: T | null = null) => {
            setModal(modalName, true, item);
        },
        closeModal = (modalName: keyof CrudModalsState<T, K>) => {
            setModal(modalName, false, null);
        }
    return { states, setModal, openModal, closeModal }
};