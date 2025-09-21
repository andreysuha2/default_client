import type { RouteLocationRaw } from "vue-router";

export type MenuItem = {
    label: string;
    icon: string;
    to: RouteLocationRaw;
}