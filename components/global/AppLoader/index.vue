<template>
	<div class="app-loader">
		<div v-if="loading"
			 class="app-loader--wrapper flex items-center justify-center bg-gray-100 bg-opacity-95 dark:bg-black dark:opacity-75">
			<img class="w-10"
				src="/images/loader.gif" alt="Loader">
		</div>
		<slot></slot>
	</div>
</template>

<script lang="ts">
export default { name: "AppLoader" };
</script>

<script setup lang="ts">
type Props = { loading: boolean };

defineProps<Props>()
</script>

<style scoped lang="scss">
.app-loader {
	position: relative;

	&--wrapper {
		z-index: 1000;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;
	}
}
</style>