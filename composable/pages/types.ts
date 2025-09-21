import type { RouteLocationRaw, RouteLocationNamedRaw } from 'vue-router'
import {extend} from "@vue/shared";


interface BasePageData {
    label: string,
    icon: string
}

interface BaseOptionPageData extends Omit<BasePageData, "label" | "icon"> {
    label?: string,
    icon?: string
}

interface MenuPageData extends BasePageData { use: boolean }

interface MenuOptionPageData extends BaseOptionPageData { use?: boolean }

export interface PageData extends BasePageData {
    to: (data?: RouteLocationNamedRaw) => RouteLocationRaw,
    menu: MenuPageData,
    page: BasePageData
}

export interface PageDataOptions extends Omit<PageData, 'page' | 'menu' | 'protect'> {
    menu?: MenuOptionPageData,
    page?: BaseOptionPageData
}

export type PageDataList = { [key: string]: PageData }

type BaseCrudModalState = { open: boolean }

export type CrudModalState<T, K extends string> = BaseCrudModalState & { [P in K]: T }

export type CrudModalsState<T, K extends string> = {
    create: BaseCrudModalState,
    update: CrudModalState<T, K>,
    info: CrudModalState<T, K>,
    remove: CrudModalState<T, K>
    restore?: CrudModalState<T, K>
}