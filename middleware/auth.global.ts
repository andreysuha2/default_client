import {useCurrentUser} from "~/composable/user";
import {UserRole} from "~/composable/user/types";
import {usePageLoader} from "~/composable/app";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const currentUser = useCurrentUser(),
        localeRoute = useLocaleRoute(),
        pageLoader = usePageLoader(),
        protectedRoutes = [
            { name: "HomePage", allowed: true },
            { name: "UsersPage", allowed: currentUser.roleIn([ UserRole.SUPER_ADMIN, UserRole.ADMIN ]) }
        ];
    if(to.meta.usePreloader) pageLoader.enable();
    if(!currentUser.isAuth.value && to.meta.name !== "LoginPage") {
        return navigateTo(localeRoute({ name: "LoginPage" }));
    } else if (currentUser.isAuth.value && to.meta.name === "LoginPage") {
        return navigateTo(localeRoute({ name: "HomePage" }));
    }
    const protectedRoute = protectedRoutes.find(({ name }) => name === to.meta.name);
    if (protectedRoute && !protectedRoute.allowed) return navigateTo(localeRoute({ name: "HomePage" }));
});
