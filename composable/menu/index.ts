import { useAppStore } from "~/store/app";
import { usePages } from "~/composable/pages";
import type { MenuItem } from "./types";

export const useMenu = () => {
    const { t } = useI18n(),
        pages = usePages(),
        appStore = useAppStore(),
        display = computed(() => appStore.menuDisplay),
        showMenu = () => appStore.showMenu(),
        hideMenu = () => appStore.hideMenu(),
        toggleMenu = (state?: boolean) => appStore.toggleMenu(state),
        links = Object.values(pages.list).reduce((list: MenuItem[], { to, menu: { use, ...menuData } }) => {
            if (use) list.push({ ...menuData, to: to() });
            return list;
        }, []);

    return { showMenu, hideMenu, toggleMenu, links, display };
}