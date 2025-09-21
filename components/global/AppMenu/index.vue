<template>
    <USlideover class="app-menu"
        variant="subtle"
        side="left"
		title="App menu"
		description="App menu"
        v-model:open="isOpen">
        <template #content>
            <UCard class="app-menu--inner"
                   :ui="{ root: 'rounded-none', header: 'p-0 sm:px-0' }">
                <template #header>
                    <menu-header class="app-menu--header"/>
                </template>
                <menu-navigation class="app-menu--navigation"/>
            </UCard>
        </template>
    </USlideover>
</template>

<script lang="ts">
import MenuHeader from './MenuHeader.vue';
import MenuNavigation from './MenuNavigation.vue';

export default { 
    name: "AppMenu",
    components: { 
        'menu-header': MenuHeader,
        'menu-navigation': MenuNavigation
    }
};
</script>

<script lang="ts" setup>
import { useMenu } from '~/composable/menu';

const menu = useMenu(),
    route = useRoute(),
    isOpen = computed({
        get(): boolean { return menu.display.value; },
        set(val: boolean) { menu.toggleMenu(val); }
    });

watch(() => route.path, () => menu.hideMenu(), { deep: true, immediate: true });
</script>