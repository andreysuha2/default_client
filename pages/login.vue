<template>
	<app-page>
		<template #title>
			<UIcon :name="loginPage.page.icon" class="mr-2 size-5"/>
			<span>{{ loginPage.page.label }}</span>
		</template>
		<template #header>
			<app-locale-switcher />
		</template>
		<UForm :schema="schema" :state="state" class="max-w-96 mx-auto" ref="form" @submit="onSubmit">
			<app-loader :loading="loading">
				<app-row>
					<app-cell>
						<UFormField :label="t('forms.login.fields.username.label')" name="username">
							<UInput :placeholder="t('forms.login.fields.username.placeholder')"
									v-model="state.username"
									class="w-full"/>
						</UFormField>
					</app-cell>
				</app-row>
				<app-row>
					<app-cell>
						<UFormField :label="t('forms.login.fields.password.label')" name="password">
							<UInput :placeholder="t('forms.login.fields.password.placeholder')"
									v-model="state.password"
									type="password"
									class="w-full"/>
						</UFormField>
					</app-cell>
				</app-row>
				<app-row>
					<app-cell class="flex justify-center">
						<UButton type="submit">{{ t('forms.login.loginBtnText') }}</UButton>
					</app-cell>
				</app-row>
			</app-loader>
		</UForm>
	</app-page>
</template>

<script lang="ts">
import AppPage from "~/components/global/AppPage/index.vue";
import AppCell from "~/components/global/AppGrid/AppCell.vue";
import AppRow from "~/components/global/AppGrid/AppRow.vue";
import AppLoader from "~/components/global/AppLoader/index.vue";
import AppLocaleSwitcher from "~/components/global/AppLocaleSwitcher/index.vue";

export default {
	name: "LoginPage",
	components: {
		"app-page": AppPage,
		"app-row": AppRow,
		"app-cell": AppCell,
		"app-loader": AppLoader,
		"app-locale-switcher": AppLocaleSwitcher
	}
};
</script>

<script lang="ts" setup>
import { usePages } from "~/composable/pages";
import { object, string, type InferType } from 'yup';
import { useServerErrorHandler } from "~/composable/serverErrorHandler";
import { useCurrentUser } from "~/composable/user";
import type { FormSubmitEvent } from "#ui/types";

definePageMeta({ layout: false, name: "LoginPage" });

const { t } = useI18n(),
	pages = usePages(),
	loading = ref(false),
	localeRoute = useLocaleRoute(),
	form = useTemplateRef('form'),
	toast = useToast(),
	currentUser = useCurrentUser(),
	loginPage = pages.list.login;
useHead({ title: loginPage.page.label });

const schema = object({
		username: string().required().label(t('forms.login.fields.username.label')),
		password: string().required().label(t('forms.login.fields.password.label'))
	}),
	state = reactive({
		username: '',
		password: ''
	})

type Schema = InferType<typeof schema>;

const { handleFormError } = useServerErrorHandler(),
	onSubmit = async (e: FormSubmitEvent<Schema>): Promise<void> => {
		loading.value = true;
		const { username, password } = e.data;
		currentUser.login(username, password)
			.then(async ({ name }) => {
				toast.add({
					title: t('forms.login.toasts.authorized.title'),
					description: t('forms.login.toasts.authorized.description', { name }),
					icon: 'i-heroicons-shield-check-16-solid',
					color: 'primary'
				});
				await navigateTo(localeRoute({ name: "HomePage" }));
			}).catch(e => handleFormError(e, "forms.login", form))
			.finally(async () => { loading.value = false; });
	}
</script>