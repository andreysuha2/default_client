<template>
    <UDropdownMenu :items="items">
        <UButton :icon="profilePage.page.icon" class="text-white"/>
    </UDropdownMenu>
</template>

<script lang="ts">
export default { name: "UserMenu" };
</script>

<script lang="ts" setup>
import { usePages } from "~/composable/pages";
import { useCurrentUser } from "~/composable/user";
import type { DropdownMenuItem } from "@nuxt/ui";

const pages = usePages(),
    { t } = useI18n(),
    toasts = useToast(),
    currentUser = useCurrentUser(),
    localePath = useLocalePath(),
    profilePage = pages.list.profile,
    items: DropdownMenuItem[] = [
        {
            label: profilePage.page.label,
            to: localePath({ name: "ProfilePage" })
        },
        {
            label: t("forms.logout.logoutBtn"),
            onSelect() {
                currentUser.logout()
                    .then(async () => {
                        await navigateTo(localePath({ name: "LoginPage" }));
                        toasts.add({
                            title: t("forms.logout.toasts.success.title"),
                            description: t("forms.logout.toasts.success.description"),
                            icon: 'i-heroicons-shield-check-16-solid',
                            color: 'primary'
                        })
                    }).catch(e => console.log(e));
            },
        }
    ]
</script>