<template>
    <UApp>
        <NuxtLayout>
            <NuxtPage/>
        </NuxtLayout>
    </UApp>
</template>

<script lang="ts">
import "~/assets/scss/main.scss";

export default { name: "App" };
</script>

<style lang="scss">
html, body, #__nuxt {
    height: 100%;
}
</style>