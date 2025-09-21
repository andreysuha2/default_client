<template>
    <app-page>
        <template #title>
            <UIcon :name="profilePage.page.icon" class="mr-2 size-5"/>
            <span>{{ profilePage.page.label }}</span>
        </template>
		<template #header>
			<UButton icon="i-heroicons-pencil-square-16-solid">{{ t("pages.profile.editBtn") }}</UButton>
		</template>
        <div>
			<app-row>
				<app-cell>
					<span>{{ t("pages.profile.data.name") }}:</span>
				</app-cell>
				<app-cell>
					<span>
						{{ currentUserData?.name }}
					</span>
				</app-cell>
			</app-row>
			<app-row>
				<app-cell>
					<span>{{ t("pages.profile.data.username") }}:</span>
				</app-cell>
				<app-cell>
					<span>
						{{ currentUserData?.username }}
					</span>
				</app-cell>
			</app-row>
			<app-row>
				<app-cell>
					<span>{{ t("pages.profile.data.role") }}:</span>
				</app-cell>
				<app-cell>
					<span>
						{{ currentUserData?.role }}
					</span>
				</app-cell>
			</app-row>
			<app-row>
				<app-cell>
					<span>{{ t("pages.profile.data.createdAt") }}:</span>
				</app-cell>
				<app-cell>
					<span>
						{{ currentUserData ? new Date(currentUserData.createdAt).toLocaleString() : "-" }}
					</span>
				</app-cell>
			</app-row>
			<app-row>
				<app-cell>
					<span>{{ t("pages.profile.data.updatedAt") }}:</span>
				</app-cell>
				<app-cell>
					<span>
						{{ currentUserData?.updatedAt ? new Date(currentUserData?.updatedAt).toLocaleString() : "-" }}
					</span>
				</app-cell>
			</app-row>
		</div>
    </app-page>
</template>

<script lang="ts">
import AppPage from "~/components/global/AppPage/index.vue";
import AppRow from "~/components/global/AppGrid/AppRow.vue";
import AppCell from "~/components/global/AppGrid/AppCell.vue";

export default {
    name: "ProfilePage",
    components: {
		'app-page': AppPage,
		'app-row': AppRow,
		'app-cell': AppCell
	}
};
</script>

<script lang="ts" setup>
import { usePages } from "~/composable/pages";
import { useCurrentUser } from "~/composable/user";
import type {UserResponse} from "~/composable/user/types";

definePageMeta({ name: "ProfilePage" });

const { t } = useI18n(),
	pages = usePages(),
    profilePage = pages.list.profile;
useHead({ title: profilePage.page.label });

const currentUserData: Ref<UserResponse | null | undefined> = ref(),
	currentUser = useCurrentUser();
currentUser.load().then(data => { currentUserData.value = data; })
	.catch(e => console.log(e));
</script>