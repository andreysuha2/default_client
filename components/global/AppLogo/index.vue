<template>
    <ULink :to="$localePath(link)" class="app-logo">
        <img class="app-logo--image" src="/images/logo.jpg" alt="logo">
    </ULink>
</template>

<script lang="ts">
import type { PropType } from "vue";
import type { RouteLocationRaw } from "vue-router"

export default {
    name: "AppLogo",
    props: {
        link: {
            type: Object as PropType<RouteLocationRaw>,
            default: () => ({ name: "HomePage" })
        }
    }
};
</script>

<style lang="scss">
.app-logo {
    border-radius: 50%;
    overflow: hidden;
    display: block;

    &--image {
        width: 100%;
        max-width: 35px;
    }
}
</style>