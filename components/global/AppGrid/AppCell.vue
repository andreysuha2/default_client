<template>
	<div class="app-cell">
		<slot></slot>
  	</div>
</template>

<script lang="ts">
export default { name: 'AppCell' };
</script>

<style lang="scss" scoped>
.app-cell {
	// varibles
	--app-cell-padding-x: 10px;

	// styles
	width: 100%;

	&:not(:first-child) {
		padding-left: var(--app-cell-padding-x);
	}

	&:not(:last-child) {
		padding-right: var(--app-cell-padding-x);
	}
}
</style>