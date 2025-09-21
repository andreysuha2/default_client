<template>
  	<div class="app-row flex justify-between">
		<slot></slot>
  	</div>
</template>

<script lang="ts">
export default { name: 'AppRow' };
</script>

<style lang="scss" scoped>
.app-row {
	// variables
	--app-row-bottom-margin: 10px;
	--app-row-flex-direction: row;

	// styles
	flex-direction: var(--app-row-flex-direction);

	&:not(:last-child) {
		margin-bottom: var(--app-row-bottom-margin);
	}
}
</style>