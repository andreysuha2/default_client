<template>
    <footer class="app-footer bg-steppe-500 py-2.5">
        <UContainer class="app-footer--container">
            <p class="text-center text-white" v-html="copy"></p>
        </UContainer>
    </footer>
</template>

<script lang="ts">
export default { name: "AppFooter" };
</script>

<script lang="ts" setup>
const { t } = useI18n(),
    startYear = 2025,
    nowYear = new Date().getFullYear(),
    years = startYear < nowYear ? `${startYear} - ${nowYear}` : startYear,
    copy = computed(() => `${t("footer.copyright")} ${years}`);
</script>