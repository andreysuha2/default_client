<template>
    <div class="app-menu-navigation">
        <UNavigationMenu orientation="vertical" :items="links"
			:ui="{ link: 'hover:before:bg-primary/10 before:transition-colors before:duration-500' }"/>
    </div>
</template>

<script lang="ts">
export default { name: "AppMenuNavigation" };
</script>

<script lang="ts" setup>
import { useMenu } from "~/composable/menu";

const menu = useMenu(),
	links = menu.links;
</script>