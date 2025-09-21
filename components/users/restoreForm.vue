<template>
    <UModal v-model:open="open"
            :title="t('pages.users.forms.restore.title', { name: user?.name })">
        <template #body>
            <app-loader :loading="loader">
                <UForm :schema="schema" :state="state" ref="form" @submit="onSubmit">
                    <app-row>
                        <app-cell class="flex justify-center">
                            <UButton color="primary"
                                     type="submit">{{ t('pages.users.forms.restore.submitBtn') }}</UButton>
                        </app-cell>
                        <app-cell class="flex justify-center">
                            <UButton variant="outline"
                                     @click="open = false">{{ t('pages.users.forms.restore.cancelBtn') }}</UButton>
                        </app-cell>
                    </app-row>
                </UForm>
            </app-loader>
        </template>
    </UModal>
</template>

<script lang="ts">
import AppRow from "~/components/global/AppGrid/AppRow.vue";
import AppCell from "~/components/global/AppGrid/AppCell.vue";
import AppLoader from "~/components/global/AppLoader/index.vue"

export default {
    name: "RestoreUserForm",
    components: {
        "app-row": AppRow,
        "app-cell": AppCell,
        "app-loader": AppLoader
    }
}
</script>

<script lang="ts" setup>
import { type UserResponse } from "~/composable/user/types";
import { useUsers } from "~/composable/user";
import { useServerErrorHandler } from "~/composable/serverErrorHandler";
import { object, number, type InferType } from 'yup';
import type { FormSubmitEvent } from "#ui/types";

type Props = { user: UserResponse | null }

const { user } = defineProps<Props>(),
    users = useUsers(),
    loader = ref(false),
    emit = defineEmits(['user-restored']),
    open = defineModel(),
    form = useTemplateRef('form'),
    toast = useToast(),
    { t } = useI18n();

const schema = object({ id: number().required().positive() }),
    state = reactive({ id: user?.id || 0 });

type Schema = InferType<typeof schema>

const { handleFormError } = useServerErrorHandler(),
    onSubmit = async (e: FormSubmitEvent<Schema>): Promise<void> => {
        if (!user) return;
        loader.value = true;
        users.restore(e.data.id).then((user) => {
            emit("user-restored", user);
            open.value = false
            toast.add({
                title: t("pages.users.forms.restore.toasts.success.title"),
                description: t("pages.users.forms.restore.toasts.success.description", { name: user.name }),
                icon: 'i-heroicons-shield-check-16-solid',
                color: 'primary'
            });
        }).catch((e) => handleFormError(e, 'pages.users.forms.remove', form))
            .finally(() => loader.value = false);
    }
</script>