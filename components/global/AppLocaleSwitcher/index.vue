<template>
    <UDropdownMenu :items="languages">
        <UButton icon="i-heroicons-language-16-solid" class="text-white"/>
    </UDropdownMenu>
</template>

<script lang="ts">
export default { name: 'AppLocaleSwitcher' };
</script>

<script lang="ts" setup>
import type { ComputedRef } from "vue"
import type { DropdownMenuItem } from "@nuxt/ui";

const { locales } = useI18n(),
    switchLocalePath = useSwitchLocalePath(),
    languages: ComputedRef<DropdownMenuItem[]> = computed(() => locales.value.map(locale => ({
        label: locale.name,
        to: switchLocalePath(locale.code)
    })));
</script>