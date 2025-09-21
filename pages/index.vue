<template>
    <app-page>
        <template #title>
			<UIcon :name="homePage.page.icon" class="mr-2 size-5"/>
			<span>{{ homePage.page.label }}</span>
		</template>
        <p>Some content</p>
    </app-page>
</template>

<script lang="ts">
import AppPage from "~/components/global/AppPage/index.vue";

export default { 
    name: "HomePage",
    components: { 'app-page': AppPage }
};
</script>

<script lang="ts" setup>
import { usePages } from "~/composable/pages";

definePageMeta({ name: "HomePage" });

const pages = usePages(),
	homePage = pages.list.home;
useHead({ title: homePage.page.label })
</script>