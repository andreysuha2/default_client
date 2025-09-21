<template>
    <ClientOnly>
        <UButton v-bind="$attrs"
			class="app-theme-switcher"
            @click="isDark = !isDark"
            aria-label="Theme"
            :icon="iconName">
        </UButton>
    </ClientOnly>
</template>

<script lang="ts">
export default {
	name: "AppThemeSwitcher",
	inheritAttrs: false
};
</script>

<script lang="ts" setup>
const colorTheme = useColorMode(),
    isDark = computed({
        get() { return colorTheme.value === 'dark'; },
        set() { colorTheme.preference = colorTheme.value === 'dark' ? 'light' : 'dark'; }
    }),
    iconName = computed(() => isDark.value ? 'i-heroicons-moon-20-solid'  : 'i-heroicons-sun-20-solid');
</script>