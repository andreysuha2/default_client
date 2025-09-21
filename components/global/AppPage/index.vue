<template>
    <div class="app-page pt-5 pb-6">
        <UContainer class="app-page--container">
            <UCard class="app-page--inner">
                <template #header>
                    <div class="flex justify-between items-center">
                        <h1 class="app-page--title flex items-center">
                            <slot name="title"></slot>
                        </h1>
                        <div class="app-page--header">
                            <slot name="header"></slot>
                        </div>
                    </div>
                </template>
                <div class="app-page--content">
                    <slot></slot>
                </div>
            </UCard>
        </UContainer>
    </div>
</template>

<script lang="ts">
export default { name: 'AppPage' };
</script>

<style lang="scss" scoped>
.app-page {
    &--title {
        font: {
            size: 18px;
            weight: 500;
        }
    }
}
</style>