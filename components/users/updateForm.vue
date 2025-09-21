<template>
	<UModal v-model:open="open"
			:title="t('pages.users.forms.update.title', { name: user?.name })">
		<template #body>
			<app-loader :loading="loader">
				<UForm :schema="schema" :state="state" ref="form" @submit="onSubmit">
					<app-row>
						<app-cell>
							<UFormField :label="t('pages.users.forms.update.fields.name.label')" name="name">
								<UInput class="w-full"
										v-model="state.name"
										:placeholder="t('pages.users.forms.update.fields.name.placeholder')"/>
							</UFormField>
						</app-cell>
					</app-row>
					<app-row>
						<app-cell>
							<UFormField :label="t('pages.users.forms.update.fields.username.label')" name="username">
								<UButtonGroup class="w-full">
									<UInput class="w-full"
											v-model="state.username"
											:placeholder="t('pages.users.forms.update.fields.username.placeholder')"/>
									<UButton @click="generateUsername"
											 :title="t('pages.users.forms.update.fields.username.generateBtn')"
											 :disabled="!state.name"
											 icon="i-heroicons-arrow-path-solid"/>
								</UButtonGroup>
							</UFormField>
						</app-cell>
					</app-row>
					<app-row>
						<app-cell>
							<UFormField :label="t('pages.users.forms.update.fields.role.label')" name="role">
								<USelect class="w-full"
										 v-model="state.role"
										 :items="roles"
										 :placeholder="t('pages.users.forms.update.fields.role.placeholder')"/>
							</UFormField>
						</app-cell>
					</app-row>
					<app-row>
						<app-cell>
							<UFormField :label="t('pages.users.forms.update.fields.password.label')" name="password">
								<UButtonGroup class="w-full">
									<UInput class="w-full"
											v-model="state.password"
											:type="passwordType"
											:placeholder="t('pages.users.forms.update.fields.password.placeholder')"/>
									<UButton
										:title="passwordTitle"
										@click="passwordShow = !passwordShow"
										:icon="passwordIcon"/>
									<UButton :title="t('pages.users.forms.update.fields.password.generateTitle')"
											 @click="generatePassword"
											 icon="i-heroicons-arrow-path-16-solid"/>
								</UButtonGroup>
							</UFormField>
						</app-cell>
					</app-row>
					<app-row>
						<app-cell class="flex justify-center">
							<UButton type="submit">{{ t('pages.users.forms.update.submitBtn') }}</UButton>
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
	name: "UpdateUserForm",
	components: {
		"app-row": AppRow,
		"app-cell": AppCell,
		"app-loader": AppLoader
	}
}
</script>

<script lang="ts" setup>
import { useApp } from "~/composable/app";
import { type UserUpdateRequest, type UserResponse, UserRole } from "~/composable/user/types";
import { useUsers } from "~/composable/user";
import { useServerErrorHandler } from "~/composable/serverErrorHandler";
import { object, string, type InferType } from 'yup';
import type { FormSubmitEvent } from "#ui/types";
import cyrillicToTranslit from "cyrillic-to-translit-js";

type Props = { user: UserResponse | null }

const { user } = defineProps<Props>(),
	app = useApp(),
	users = useUsers(),
	translit = cyrillicToTranslit({ preset: 'uk' }),
	loader = ref(false),
	emit = defineEmits(['user-updated']),
	open = defineModel(),
	form = useTemplateRef('form'),
	roles = Object.values(UserRole),
	toast = useToast(),
	{ t } = useI18n();

const passwordShow = ref(false),
	passwordType = computed(() => passwordShow.value ? "text" : "password"),
	passwordIcon = computed(() => passwordShow.value ? "i-heroicons-eye-slash-solid" : "i-heroicons:eye-solid"),
	passwordTitle = computed(() => {
		return passwordShow.value ? t("pages.users.forms.update.fields.password.hideTitle") :
			t("pages.users.forms.update.fields.password.showTitle");
	}),
	generatePassword = () => app.generatePassword({
		length: 10,
		numbers: true,
		lowercase: true,
		uppercase: true,
		symbols: "!@#$%^&*()_+~#?",
		strict: true
	}).then((value) => { state.password = value }).catch(e => console.log(e));

const generateUsername = () => {
	if(state.name) {
		state.username = translit.transform(`${state.name}`, "_").toLowerCase();
	}
}

const schema = object({
		name: string().required().min(2).max(20).test(
			"firstSecondNamesRequired",
			t('pages.users.forms.update.errors.firstSecondNamesRequired'),
			(value: string) => value.split(' ').length === 2).label(t('pages.users.forms.update.fields.name.label')),
		username: string().required().min(5).max(50).label(t('pages.users.forms.update.fields.username.label')),
		role: string().required().oneOf(roles).label(t('pages.users.forms.update.fields.role.label')),
		password: string().min(5).max(64)
			.nullable()
			.transform((value) => !!value ? value : null)
			.label(t('pages.users.forms.update.fields.password.label'))
	}),
	state: UserUpdateRequest = reactive({
		id: user?.id || 0,
		name: user?.name || '',
		username: user?.username || '',
		role: user?.role || UserRole.USER,
		password: ''
	});

type Schema = InferType<typeof schema>

const { handleFormError } = useServerErrorHandler(),
	onSubmit = async (e: FormSubmitEvent<Schema>): Promise<void> => {
		if (!user) return;
		loader.value = true;
		const { password, ...data } = e.data,
			sendData = { id: user.id, ...data, ...(password ? { password } : {}) };
		users.update(user.id, sendData).then((user) => {
			emit("user-updated", user);
			open.value = false
			toast.add({
				title: t("pages.users.forms.update.toasts.success.title"),
				description: t("pages.users.forms.update.toasts.success.description", { name: user.name }),
				icon: 'i-heroicons-shield-check-16-solid',
				color: 'primary'
			});
		}).catch((e) => handleFormError(e, 'pages.users.forms.update', form))
			.finally(() => loader.value = false);
	}
</script>