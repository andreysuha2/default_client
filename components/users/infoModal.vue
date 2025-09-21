<template>
    <UModal class="info-modal"
            v-model:open="open"
            :title="t('pages.users.forms.info.title', { name: user?.name })">
        <template v-if="user" #body>
            <app-row class="info-modal--row">
                <app-cell class="info-modal--cell info-modal--cell__key">
                    <span>{{ t('pages.users.forms.info.fields.id') }}</span>:
                </app-cell>
                <app-cell class="info-modal--cell info-modal--cell__value">
                    <span>{{ user.id }}</span>
                </app-cell>
            </app-row>
            <app-row class="info-modal--row">
                <app-cell class="info-modal--cell info-modal--cell__key">
                    <span>{{ t('pages.users.forms.info.fields.name') }}</span>:
                </app-cell>
                <app-cell class="info-modal--cell info-modal--cell__value">
                    <span>{{ user.name }}</span>
                </app-cell>
            </app-row>
            <app-row class="info-modal--row">
                <app-cell class="info-modal--cell info-modal--cell__key">
                    <span>{{ t('pages.users.forms.info.fields.username') }}</span>:
                </app-cell>
                <app-cell class="info-modal--cell info-modal--cell__value">
                    <span>{{ user.username }}</span>
                </app-cell>
            </app-row>
            <app-row class="info-modal--row">
                <app-cell class="info-modal--cell info-modal--cell__key">
                    <span>{{ t('pages.users.forms.info.fields.role') }}</span>:
                </app-cell>
                <app-cell class="info-modal--cell info-modal--cell__value">
                    <span>{{ user.role }}</span>
                </app-cell>
            </app-row>
            <app-row class="info-modal--row">
                <app-cell class="info-modal--cell info-modal--cell__key">
                    <span>{{ t('pages.users.forms.info.fields.createdAt') }}</span>:
                </app-cell>
                <app-cell class="info-modal--cell info-modal--cell__value">
                    <span>{{ new Date(user.createdAt).toLocaleString() }}</span>
                </app-cell>
            </app-row>
            <app-row class="info-modal--row" v-if="user.updatedAt">
                <app-cell class="info-modal--cell info-modal--cell__key">
                    <span>{{ t('pages.users.forms.info.fields.updatedAt') }}</span>:
                </app-cell>
                <app-cell class="info-modal--cell info-modal--cell__value">
                    <span>{{ new Date(user.updatedAt).toLocaleString() }}</span>
                </app-cell>
            </app-row>
            <app-row class="info-modal--row" v-if="user.deletedAt">
                <app-cell class="info-modal--cell info-modal--cell__key">
                    <span>{{ t('pages.users.forms.info.fields.deletedAt') }}</span>:
                </app-cell>
                <app-cell class="info-modal--cell info-modal--cell__value">
                    <span>{{ new Date(user.deletedAt).toLocaleString() }}</span>
                </app-cell>
            </app-row>
        </template>
    </UModal>
</template>

<script lang="ts">
import AppRow from "~/components/global/AppGrid/AppRow.vue";
import AppCell from "~/components/global/AppGrid/AppCell.vue";

export default {
    name: "InfoUserModal",
    components: {
        "app-row": AppRow,
        "app-cell": AppCell
    }
}
</script>

<script lang="ts" setup>
import { type UserResponse } from "~/composable/user/types";

type Props = { user: UserResponse | null }

const { user } = defineProps<Props>(),
    open = defineModel(),
    { t } = useI18n();
</script>