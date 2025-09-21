<template>
	<NuxtLayout>
		<app-page>
			<template #title>Помилка {{ error.statusCode }}</template>
			<app-row>
				<app-cell>
					<p class="text-center dark:text-white">{{ error.message }}</p>
				</app-cell>
			</app-row>
			<app-row>
				<app-cell class="flex justify-center">
					<UButton @click="$router.back()">Повернутись</UButton>
				</app-cell>
			</app-row>
		</app-page>
	</NuxtLayout>
</template>

<script lang="ts">
import AppPage from "~/components/global/AppPage/index.vue";
import AppRow from "~/components/global/AppGrid/AppRow.vue";
import AppCell from "~/components/global/AppGrid/AppCell.vue";

export default {
	name: "ErrorPage",
	components: {
		"app-page": AppPage,
		"app-row": AppRow,
		"app-cell": AppCell
	}
};
</script>

<script lang="ts" setup>
const error = useError();
</script>