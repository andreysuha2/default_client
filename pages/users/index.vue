<template>
	<app-page>
		<template #title>
			<UIcon :name="usersPage.page.icon" class="mr-2 size-5"/>
			<span>{{ usersPage.page.label }}</span>
		</template>
		<template #header>
			<div>
				<span>{{ t("pages.users.header.totalUsers") }}: </span>
				<span>{{ listInfo?.totalItems }}</span>
			</div>
		</template>
		<div class="flex items-center justify-end">
			<div v-if="currentUser.roleIn([ UserRole.SUPER_ADMIN ])"
                class="w-3xs flex justify-end">
				<UButton @click="showControlModal('create', null)" color="info">
                    {{ t("pages.users.controls.newUserBtn") }}
                </UButton>
			</div>
		</div>
		<template v-if="listInfo">
			<UTable :columns="columns" :data="usersList">
				<template #status-cell="{ row }">
					<div class="flex justify-center">
						<UIcon :class="[
							row.original.deletedAt ? 'text-error' : 'text-success',
							'size-5'
							]"
							:name="row.original.deletedAt ? 'i-heroicons-x-circle-16-solid' :
					'i-heroicons:check-circle-16-solid'"/>
					</div>
				</template>
				<template #controls-cell="{ row }">
					<UButton :title="t('pages.users.table.controls.info')"
                             @click="showControlModal('info', row.original)"
                             class="mr-2" color="info" icon="i-heroicons-information-circle-16-solid"/>
					<template v-if="currentUser.roleIn([ UserRole.SUPER_ADMIN ])">
                        <template v-if="row.original.deletedAt">
                            <UButton :title="t('pages.users.table.controls.restore')"
                                     class="mr-2" color="info" icon="i-heroicons-arrow-path-16-solid"
                                     @click="showControlModal('restore', row.original)"/>
                        </template>
                        <template v-else>
                            <UButton :title="t('pages.users.table.controls.update')"
                                     @click="showControlModal('update', row.original)"
                                     class="mr-2" color="info" icon="i-heroicons-pencil-square-16-solid"/>
                            <UButton :title="t('pages.users.table.controls.remove')"
                                     @click="showControlModal('remove', row.original)"
                                     color="error" icon="i-heroicons-archive-box-x-mark-20-solid"/>
                        </template>
                    </template>
				</template>
			</UTable>
			<UPagination v-model:page="page"
                         v-on:update:page="to"
                         class="mt-2"
                         :total="listInfo.totalItems"/>
		</template>
        <user-create-form @user-created="to(listInfo?.page || 1)"
			              v-model="modalsState.create.open"/>
        <user-info-modal v-if="modalsState.info.open"
                         v-model="modalsState.info.open"
                         :user="modalsState.info.user"/>
		<user-update-form v-if="modalsState.update.open"
						  :user="modalsState.update.user"
						  @user-updated="to(listInfo?.page || 1)"
						  v-model="modalsState.update.open"/>
        <user-remove-form v-if="modalsState.remove.open"
                          :user="modalsState.remove.user"
                          @user-removed="to(listInfo?.page || 1)"
                          v-model="modalsState.remove.open"/>
        <user-restore-form v-if="modalsState.restore?.open"
                           :user="modalsState.restore?.user"
                           @user-restored="to(listInfo?.page || 1)"
                           v-model="modalsState.restore.open"/>
	</app-page>
</template>

<script lang="ts">
import AppPage from "~/components/global/AppPage/index.vue";
import CreateForm from "~/components/users/createForm.vue";
import UpdateForm from "~/components/users/updateForm.vue";
import InfoModal from "~/components/users/infoModal.vue";
import RemoveForm from "~/components/users/removeForm.vue";
import RestoreForm from "~/components/users/restoreForm.vue";

export default {
	name: "UsersPage",
	components: {
        'app-page': AppPage,
        'user-create-form': CreateForm,
		'user-update-form': UpdateForm,
        'user-info-modal': InfoModal,
        'user-remove-form': RemoveForm,
        'user-restore-form': RestoreForm
    }
};
</script>

<script lang="ts" setup>
import { usePages, useCrudModalsState } from "~/composable/pages";
import { useUsers, useCurrentUser } from "~/composable/user";
import { UserRole } from "~/composable/user/types";
import type { Ref } from "#imports";
import type { UserResponse, UsersListResponse } from "~/composable/user/types";
import type { TableColumn } from "#ui/components/Table.vue";

definePageMeta({ name: "UsersPage" });

const currentUser = useCurrentUser(),
    pages = usePages(),
	route = useRoute(),
	router = useRouter(),
	page = ref(Number(route.query.page) || 1),
	perPage = Number(route.query.perPage) || 10,
    usersPage = pages.list.users;
useHead({ title: usersPage.page.label });

const {
	states: modalsState,
	openModal: showControlModal
} = useCrudModalsState<UserResponse | null, 'user'>("user", true);

interface ListInfo extends Omit<UsersListResponse, "users"> {};

const { t } = useI18n(),
	usersList: Ref<UserResponse[] | null | undefined> = ref(),
	listInfo: Ref<ListInfo | null | undefined> = ref(),
    users = useUsers(),
	loadUsers = (page: number, perPage: number) => {
		users.list({ page, perPage })
			.then(({ users, ...data }) => {
				usersList.value = users;
				listInfo.value = data;
			}).catch(e => console.log(e));
	};

const to = (page: number) => {
	loadUsers(page, perPage);
	router.push({ query: { page } });
};

to(page.value);

const columns: TableColumn<UserResponse>[] = [
	{
		accessorKey: "id",
		header: "ID"
	},
	{
		accessorKey: "name",
		header: t("pages.users.table.header.name")
	},
	{
		accessorKey: "username",
		header: t("pages.users.table.header.username")
	},
	{
		accessorKey: "role",
		header: t("pages.users.table.header.role")
	},
	{
		id: "status",
		header: t("pages.users.table.header.status")
	},
	{
		id: "controls",
		header: t("pages.users.table.header.controls")
	}
];
</script>