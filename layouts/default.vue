<template>
    <div class="app">
        <app-menu class="app--menu"/>
        <div class="app--content">
            <app-header class="app--header"/>
            <main class="app--main">
                <app-loader class="h-full" :loading="loader.loading.value">
					<slot></slot>
				</app-loader>
            </main>
        </div>
        <app-footer class="app--footer"/>
    </div>
</template>

<script lang="ts">
import AppHeader from "~/components/global/AppHeader/index.vue";
import AppFooter from "~/components/global/AppFooter/index.vue";
import AppMenu from "~/components/global/AppMenu/index.vue";
import AppLoader from "~/components/global/AppLoader/index.vue";

export default {
    name: "BaseLayout",
    components: {
        "app-header": AppHeader,
        "app-footer": AppFooter,
        "app-menu": AppMenu,
		"app-loader": AppLoader
    }
}
</script>

<script lang="ts" setup>
import { usePageLoader } from "~/composable/app";

const loader = usePageLoader();
</script>

<style lang="scss" scoped>
.app {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;

    &--content {
        flex: 1 0 auto;
    }

    &--footer {
        flex: 0 0 auto;
    }
}
</style>