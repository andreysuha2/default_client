<template>
    <header class="app-header py-2.5 bg-steppe-500">
        <UContainer class="app-header--container flex justify-between items-center">
            <div class="app-header--left">
                <UButton icon="i-heroicons-bars-3"
					class="text-white"
                    @click="menu.showMenu()"
                    aria-label="Menu"></UButton>
            </div>
            <div class="app-header--center">
                <app-logo class="app-header--logo"/>
            </div>
            <div class="app-header-right flex items-center">
                <app-locale-switcher class="mr-2"/>
                <app-theme-switcher class="text-white mr-2"/>
                <user-menu/>
            </div>
        </UContainer>
    </header>
</template>

<script lang="ts">
import AppThemeSwitcher from "~/components/global/AppThemeSwitcher/index.vue";
import AppLocaleSwitcher from "~/components/global/AppLocaleSwitcher/index.vue";
import UserMenu from "./userMenu.vue";
import AppLogo from "~/components/global/AppLogo/index.vue";

export default { 
    name: "AppHeader",
    components: {
        'app-locale-switcher': AppLocaleSwitcher,
        'app-theme-switcher': AppThemeSwitcher,
        'app-logo': AppLogo,
        'user-menu': UserMenu
    }
}
</script>

<script lang="ts" setup>
import { useMenu } from "~/composable/menu";
const menu = useMenu();
</script>