<template>
  	<div class="app-menu-header bg-steppe-500 p-4 sm:px-6">
		<div class="app-container flex justify-between items-center">
			<app-logo class="app-menu-header--logo"/>
			<div class="flex items-center">
				<app-locale-switcher class="mr-2"/>
				<UButton @click="menu.hideMenu()"
						 class="text-white"
						 icon="i-heroicons-x-mark-20-solid"></UButton>
			</div>
		</div>
  	</div>
</template>

<script lang="ts">
import AppLogo from '~/components/global/AppLogo/index.vue';
import AppLocaleSwitcher from '~/components/global/AppLocaleSwitcher/index.vue';

export default { 
	name: "AppMenuHeader",
	components: {
		'app-logo': AppLogo,
		'app-locale-switcher': AppLocaleSwitcher
	}
};
</script>

<script lang="ts" setup>
import { useMenu } from '~/composable/menu';

const menu = useMenu();
</script>